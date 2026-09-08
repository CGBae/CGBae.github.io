import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Optional argument: the original final presentation MP4. Not required for site builds.
const root = fileURLToPath(new URL('../', import.meta.url));
const source = process.argv[2] ? resolve(process.argv[2]) : resolve(root, '../ROKEY-Project-F4-1-/docs/portfolio/assets/F-4_협동3_김승주_배철규_이재권_임동욱.mp4');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const sourceHash = hash(readFileSync(source));
if (sourceHash !== '98e10fbe7fcd6a1085e27f9d2889c145a00c6be24f8c8ee55bc68ed021ea4d79') {
  throw new Error('The source video differs from the reviewed final presentation. Review its scenes before editing.');
}
const work = join(root, '.astro/fueling-demo-media');
const destination = join(root, 'public/projects/automatic-fueling-robot');
const documentation = join(root, 'docs/reviews');
for (const path of [work, destination, documentation]) mkdirSync(path, { recursive: true });
const videoName = 'final-process-demo.mp4';
const posterName = 'final-process-poster.webp';
const captionsName = 'final-process-demo.ko.vtt';
const run = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { windowsHide: true, stdio: 'inherit' });
// Keep every shot in the source 00:03–00:50 interval, at its original playback speed.
run(['-ss', '3', '-i', source, '-t', '47', '-map', '0:v:0', '-an', '-vf', 'fps=30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-map_metadata', '-1', '-movflags', '+faststart', join(work, videoName)]);
run(['-ss', '7.5', '-i', source, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '85', join(work, posterName)]);
const cues = [
  ['00:00.000', '00:04.500', 'Isaac Sim 주유소 환경 · 차량 도착'],
  ['00:04.500', '00:13.700', '주유 요청 UI · 로봇의 캡 작업'],
  ['00:13.700', '00:23.000', '주유구 주변 노즐 동작 · 주유 진행 UI'],
  ['00:23.000', '00:28.000', '노즐 유지와 후퇴'],
  ['00:28.000', '00:42.000', '캡 복원과 주유구 덮개 작업'],
  ['00:42.000', '00:45.500', '작업 마무리 · 영수증 UI'],
  ['00:45.500', '00:47.000', '차량 이동 · 시연 종료'],
];
writeFileSync(join(work, captionsName), 'WEBVTT\n\n' + cues.map(([start, end, text]) => start + ' --> ' + end + '\n' + text).join('\n\n') + '\n');
const metadata = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate,pix_fmt', '-of', 'json', join(work, videoName)], { encoding: 'utf8', windowsHide: true }));
const stream = metadata.streams[0];
if (Math.abs(Number(metadata.format.duration) - 47) > 0.05 || stream.width !== 1920 || stream.height !== 1080 || metadata.streams.length !== 1) throw new Error('Unexpected demo export metadata');
const assets = [videoName, posterName, captionsName].map((filename) => {
  const bytes = readFileSync(join(work, filename));
  copyFileSync(join(work, filename), join(destination, filename));
  return { filename, bytes: bytes.length, sha256: hash(bytes) };
});
writeFileSync(join(documentation, 'automatic-fueling-demo-media.json'), JSON.stringify({
  source: { repository: 'CGBae/ROKEY-Project-F4-1-', path: 'docs/portfolio/assets/F-4_협동3_김승주_배철규_이재권_임동욱.mp4', sha256: sourceHash, durationSeconds: 55.81 },
  selection: { startSeconds: 3, endSeconds: 50, durationSeconds: 47, shotOrder: 'unchanged', playbackSpeed: 1, audio: false, crop: 'none', fps: 30, posterSourceSeconds: 7.5 },
  description: 'Final team simulation demonstration. Captions describe scenes, not transcribed speech. The source is an edited presentation, not an uncut cycle-time or insertion-success measurement.',
  metadata, assets,
}, null, 2) + '\n');
console.log(JSON.stringify({ duration: metadata.format.duration, assets }, null, 2));