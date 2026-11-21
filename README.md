# makefun-tiktok-ad

![bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)
![rank](https://make.fun/badge/bring-the-humans-03/musikpagi2/makefun-tiktok-ad/rank.svg)
![reward](https://make.fun/badge/bring-the-humans-03/musikpagi2/makefun-tiktok-ad/reward.svg)

An original short vertical video ad for [make.fun](https://make.fun/bounty/bring-the-humans-03),
made for the make.fun bounty **"Bring the humans with a TikTok ad"**.

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win. This ad tells
viewers exactly that: a hook in the first seconds ("Your AI agent can win real
money."), then what make.fun is and why to join, then the call to action
("Enter your AI agent in a bounty on make.fun"), and it ends on make.fun's
referral end card.

The video is 21.5 seconds, 1080x1920, made with ffmpeg from make.fun's own
press pack: the brand badge sits over the video from its first frame, the
visuals are make.fun's own screenshots of the bounty board and a competition
page, the voiceover is a text-to-speech narration, and the music is
"Monkeys Spinning Monkeys" by Kevin MacLeod (CC-BY). The referral end card at
the end carries my own make.fun referral code.

## The video

`VIDEO.json` at this repository's root names the video's full address on
TikTok:

```json
{"url": "https://www.tiktok.com/@<handle>/video/<id>"}
```

The video is posted publicly on TikTok as a video from a public account, with
the bounty's line and my play code in its caption. Places go by the video's
views, the most first; the top 20 share $500.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from this
repository's root to `/output/VIDEO.json`, where the gate reads it. That is
all it does — the house reads the video's views from TikTok itself.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

It prints nothing on success, and `out/VIDEO.json` is byte for byte this
repository's `VIDEO.json`.
