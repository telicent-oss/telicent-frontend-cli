Ticket: <!-- Let the ticket expand inline. Maybe change the ticket name field for clarity -->

### Goal

<!-- The Goal. -->

### Work Completed

<!-- The Solution.  -->

### Testing Method

<!-- Describe your testing steps -->

### Code Review Tips <!-- OPTIONAL-->

<!-- Pointers for reviewer  -->

### Engineering Notes <!-- OPTIONAL-->

<!-- Implementation context  -->

### Out-of-scope <!-- OPTIONAL-->

<!-- Boundary setting -->


---

<details>
  <summary><strong>🕵️ Review Guidance</strong></summary>

---

# General guidance

- Generally, approve a PR if it makes the system better, even if it's not perfect. — [Google: The Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html)
- Aim of both PR AUTHOR and PR REVIEWER is merging
- Aim for consensus, defined as _everyone can live with the outcome_

# For PR REVIEWER:

1. Read the ticket & description
2. [Review the code](https://google.github.io/eng-practices/review/reviewer/looking-for.html) Avoid reviewing pre-PR logic
3. Request essential changes
5. Attempt _at least_ 1 helpful comment per ~500 lines; Less if the PR is already busy.


Comment shorthand terms

| **Term**       | **Meaning**                                                                 |
| - | - | 
| **PREFIX**          |
| **nit**      | Small nit-pick, non-essential change                                           |
| **q**        | Question for PR author to answer                                               |
| **assumption** | If correct, then no action required; Else, PR author replies with correction |
| **idea**     | Suggestion to think about; No change required                                  |
| **obs**      | Just an observation, doesn't affect the PR                                  |
| | | 
| | | 
| **Modifiers**         |
| `[u-resolve]` | PR author can resolve after reading                                  |
| `[u-delete]`  | PR author can delete after reading (Rare; To avoid confusion)                       |

**Example Usage:**

- **obs**:[u-resolve] Jim is also editing this file

# For PR AUTHOR:

1. Aim for enough detail in PR description for things to go smoothly
2. After requested changes, [re-request a review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews#re-requesting-a-review) (so the PR shows up in [reviews-requested:@me](https://github.com/pulls?q=is%3Apr+is%3Aopen+archived%3Afalse+sort%3Aupdated-desc+review-requested%3A%40me+))

</details>
