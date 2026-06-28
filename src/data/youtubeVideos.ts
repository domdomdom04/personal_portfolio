export type YoutubeVideo = {
  id: string;
  title: string;
};

export const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  { id: "jKKoCAdrmx0", title: "REALISTIC 'early 20s' VLOG 💌; days @ work, makeup unboxing, life crash outs, etc." },
  { id: "qslEhqsYbyc", title: "life lately VLOG 👩🏻‍💻🧸; work days, post-grad updates, desk makeover & more" },
  { id: "Xa9yxaNlVLE", title: "GRADUATION uni vlog 👩🏻‍🎓; final goodbye, grwm for grad, smiles and tears, & more" },
  { id: "GsyLbNwbkWk", title: "SLICE OF LIFE VLOG 🧸💻; life updates after uni, study cafe, 5am start, aelfriceden tryon, etc." },
  { id: "-LvreXX6AKk", title: "productive vlog 🧺; new dji pocket 4, 7am study, pottery class, etc" },
  { id: "R_4KJyJNq98", title: "INTERNSHIP VLOG 💼📎; my last week, sushi lunches, final goodbyes, etc" },
  { id: "Tedzj5D6CYg", title: "PRODUCTIVE week vlog 👩🏻‍💻📓; intern work days, new desk setup, ui/ux course & work/study balance" },
  { id: "o6lIHZMASxA", title: "realistic WORK VLOG 📂📎; full work day, weekend activities, intern workshop, &more" },
  { id: "-DNgg80WeRM", title: "realistic uni advice + grwm 🧸; how i survived my degree @ uoa (ft. judydoll)" },
  { id: "FMcsRTZ1n6A", title: "internship vlog: 🗒️worklife as a summer intern, days @ work, toy unboxing, &more" },
  { id: "eKsUrs05_-Q", title: "WEEK IN MY LIFE 💼; 9-5 intern life, life/work events, days @ the office, & more" },
  { id: "p5yRygo-MSU", title: "my 2025 wrapped; 💭 life update + 2026 goals" },
  { id: "1TOR8ezvAqY", title: "INTERN life vlog 👩🏻‍💻📁; days in my life @ zuru, intern projects, toys & meetings" },
  { id: "m-_sunEbaoM", title: "slice of life 💭; last compsci exam study, summer internship @ zuru, life reset, etc" },
  { id: "kURT2BAORa4", title: "REALISTIC STUDY VLOG 👩🏻‍💻📓; compsci final exam stress, work/uni balance, aelfriceden unboxing, etc." },
  { id: "Dwl324b-M58", title: "PRODUCTIVE UNI VLOG 💻💭; club meeting, last days @ uni, lock in session, & more" },
  { id: "W4bajZavGfM", title: "UNI VLOG 🗒️; realistic days at uni, food&friends!, new hairstyle, market day & more" },
  { id: "XSDboGNBscs", title: "SLICE OF LIFE; uni vlog 📓 lectures/work, realistic days, food & more" },
  { id: "dzYNuLcgwQY", title: "STUDY VLOG 🖇️💻; nz uoa compsci/it student, studying for tests, tired days, hauls, & more" },
  { id: "SbgMz5nkgJ8", title: "48HR uni vlog 👩🏻‍💻; endless assignments, realistic uni days, food&friends, etc." },
  { id: "4hOLSm6IJpM", title: "DAY IN MY LIFE 💻; nz student life, lectures/studying, cute cafes, etc." },
  { id: "YXAb-dgFQ28", title: "PRODUCTIVE UNI VLOG 🖇️👩🏻‍💻; nz uoa student, compsci/it major, days@uni, food & studying, & more." },
  { id: "etHcheAJfms", title: "📓ᡣ𐭩 BACK TO SCHOOL vlog; club hackathon, preparing for uni, final first day, & more" },
  { id: "b_aq8mnNMj0", title: "REALISTIC FINALS UNI VLOG 🗒️🖇️ studying/working, sickness, nintendo switch 2 unboxing, etc" },
  { id: "U6MRi5eGP-U", title: "🗒️ simple uni vlog (studying for tests, birthday celebration, chill days, etc)" },
  { id: "Dy0YzInozcA", title: "PRODUCTIVE STUDY VLOG 👩🏻‍💻📓: busy week as a cs/it major, non-stop studying, uni+work days, etc." },
  { id: "xppwMpHQmfE", title: "busy university VLOG 📂💻 uni/life balance, stressing out, etc." },
  { id: "TL7CkwfXWH8", title: "university VLOG 👩🏻‍💻 uni market day, 5AM starts, lots of food, etc." },
  { id: "kqRTfPtoCCU", title: "STUDY VLOG 🎧🗒️; aelfriceden unboxing, mid term studying, blind-boxes & more" },
  { id: "etKqcjdnUQ0", title: "PRODUCTIVE university vlog 👩🏻‍💻📂 5am mornings, study/work days, & more" },
];

export function pickRandomVideos(count: number): YoutubeVideo[] {
  const pool = [...YOUTUBE_VIDEOS];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
