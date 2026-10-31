<p align="center">
  <strong>Political Identity Instrument</strong><br>
  28 situations. A profile, not a label.
</p>

<p align="center">
  A single-file questionnaire that asks what you would do, then places the answers on six axes and ranks sixteen political archetypes against that profile.
</p>

<p align="center">
  <a href="#open-it">Open it</a> &nbsp;·&nbsp;
  <a href="#what-you-get">What you get</a> &nbsp;·&nbsp;
  <a href="#the-six-axes">The six axes</a> &nbsp;·&nbsp;
  <a href="#the-situations">The situations</a> &nbsp;·&nbsp;
  <a href="#archetypes">Archetypes</a> &nbsp;·&nbsp;
  <a href="#how-scoring-works">Scoring</a> &nbsp;·&nbsp;
  <a href="#how-to-read-a-result">How to read a result</a>
</p>

---

## Open it

No install, no server, no account. Download or clone the repository and open [`quiz.html`](quiz.html) in a browser.

Answers stay in that browser, under the key `piq-answers-v1`. Nothing is sent anywhere. If storage is blocked, the questionnaire still runs. It just will not remember your place.

| Key | Action |
| --- | --- |
| `1`–`4` | Choose an option |
| `←` `→` | Move between questions |
| Skip | Leave a question blank and come back |

A moderate, mixed result is a real result.

---

## What you get

After the 28 situations, the page shows:

- **Closest archetype**, with a short description and a runner-up
- **How decisive the match is** — clear, close, or contested, based on the gap between first and second
- **A radar chart** of how hard each axis leans, and which direction
- **A left–right placement**, a composite of the economic and social axes only
- **Six axis scores**, each from about −100 to +100
- **Your strongest driver**, and a note when the profile is split across poles that do not usually travel together
- **Five nearby archetypes**, each shown as a percentage of how close it is to your top match
- **Copy summary**, a plain-text version of the same result

You can finish with blanks. The page will say the result is partial, and axes with fewer answers count for less.

---

## The six axes

Each option carries a hidden code. You never see it while answering. A positive score pulls toward the right-hand pole.

| | Axis | −100 | +100 | Items | Weight |
| --- | --- | --- | --- | ---: | ---: |
| **E** | Economics | Collectivist | Free-market | 7 | 1.25 |
| **S** | Social values | Progressive | Conservative | 10 | 1.25 |
| **A** | Authority | Anti-state | Statist / order | 9 | 1.00 |
| **N** | Nation & identity | Cosmopolitan | Nationalist | 8 | 1.00 |
| **G** | Environment | Growth-first | Green-first | 5 | 0.80 |
| **P** | Populism & trust | Technocratic | Populist | 5 | 1.00 |

Items can load more than one axis, so the counts add up to more than 28. Economics and social values weigh a little more in the archetype match. Environment weighs a little less, because fewer questions touch it.

The left–right pin is the average of **E** and **S** only. Authority, nation, environment, and populism stay off that line on purpose.

---

## The situations

Every item is a scene, not a slogan. A neighbour, a relative, a street, a factory, a court. Four things a person might actually do. None of the wording names an ideology, a party, or an axis.

| Section | Situations |
| --- | ---: |
| Money & Work | 6 |
| People & Family | 6 |
| Rules & Power | 4 |
| Country & Identity | 3 |
| Land & Growth | 4 |
| Trust & Voice | 5 |

The point of the wording is that it is harder to flatter yourself answering "what would I do here?" than picking a side on an abstract statement.

---

## Archetypes

Sixteen profiles. Each vector is a **calibrated centroid**: it was found by searching the answers this questionnaire can actually produce, so the target is reachable rather than an abstract ideal. [`calibrate.mjs`](calibrate.mjs) is the tool that does that search.

| Archetype | In one line |
| --- | --- |
| Anarcho-Capitalist / Voluntaryist | The state is the problem. Property, exchange, and consent should carry the weight. |
| Libertarian | Markets and personal liberty, with a suspicion of concentrated power. |
| Paleolibertarian / Libertarian-Conservative | Free markets and limited government, plus traditional social order. |
| Green Nationalist / Eco-Authoritarian | Environmental protection, imposed firmly on industry and national life. |
| National Conservative | Identity, tradition, and strong institutions over elites and rapid change. |
| Traditionalist Conservative | A smaller, slower society: families, local institutions, continuity. |
| Populist Right | Sovereignty and ordinary people over elites. Institutions serve the nation, or they do not count. |
| Populist Left | Redistribution, with distrust of both corporate power and top-down institutions. |
| Revolutionary Socialist / Left-Populist | Deep economic change through mobilisation, not adjustment inside the system. |
| Social Democrat / Progressive | A strong public sector, and institutions trusted over populist appeals. |
| Progressive Activist | Inclusion, rights, and equal outcomes. The economy is a tool. |
| Green Left | Ecological limits, met through public ownership and regulation. |
| Democratic Socialist | Economic democracy: public ownership, redistribution, and labour power. |
| Centrist / Technocratic | No single axis. Evidence, institutions, and competence, close to the middle. |
| Left-Populist / Class-Economic | Aggressive redistribution through movements, not technocratic management. |
| Left-Libertarian / Anarchist | Economic equality and freedom from the state, held at the same time. |

The closest match is the archetype whose vector sits nearest your scores. Distance is weighted Euclidean distance, and thinly measured axes are turned down so a five-item score cannot shout over a ten-item one.

How far the winner sits ahead of the runner-up sets the label:

| Gap | Label |
| --- | --- |
| 12 or more | Clear match |
| 5 or more, under 12 | Close match |
| Under 5 | Contested match |

"Percentage as close" compares each other archetype to your top match. It is not a probability, and it is not a share of your identity.

---

## How scoring works

For each axis, the instrument looks at every question that can move that axis.

1. The chosen option contributes its code, from −2 to +2. An option that does not mention the axis contributes **0**. It is neutral, not missing. That keeps the denominator from shifting with the answers.
2. The axis score is the average of those codes, multiplied by 50. A string of +2 answers lands near +100. A string of −2 answers lands near −100.
3. A reliability factor shrinks axes you barely answered. Fully answered axes keep their full voice in the archetype ranking.
4. Your strongest driver is the axis with the largest reliability-adjusted lean, in either direction.
5. A split is called out when two poles pull hard in a combination that a single left–right word would flatten. Examples the instrument watches for: free-market and socially liberal, economically statist and socially conservative, green and market-friendly, nationalist and populist.

Skipped questions drop out of the averages. They do not get scored as the middle.

---

## How to read a result

This measures **what you say you would do**, not what you would do. People vote their interests and their pressures more often than their principles. Treat the profile as a starting hypothesis.

- The wording is 2026 Western Anglophone framing. In another national context, the same axes do not mean the same thing.
- Each axis is an average of a handful of items. Small swings move the numbers. The ranking is more stable than the exact scores.
- A near-centrist profile is common and legitimate. It usually means the questions were weighed one by one, not from a single prior.

---

## Recalibrate the archetypes

[`calibrate.mjs`](calibrate.mjs) searches the answer space for the profile closest to each archetype's intent, then checks that the winner of that profile is the archetype itself.

```bash
node calibrate.mjs           # report only
node calibrate.mjs --write   # rewrite the vectors inside quiz.html
```

The report prints each archetype, whether it still wins its own centroid, and the closest pairs. Use it after you edit a question, a code, or a target vector.

---

<p align="center">
  <sub>Open <a href="quiz.html">quiz.html</a>. Answer the situation, not the side you think you are on.</sub>
</p>
