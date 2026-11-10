# Tidemark PMDD Tracker

A private daily tracker for people with PMDD (premenstrual dysphoric disorder). Log symptoms on the 1 to 6 scale used by the DRSP (Daily Record of Severity of Problems), mark bleeding days, check off treatments, and see your patterns across cycles.

**Features**

- **Today:** a cycle dial with today's cycle day, your phase, when your next period is expected, and when your usual harder days begin.
- **Log:** a one-minute daily check-in covering 21 symptoms, 3 impact questions, bleeding, overall mood, treatments and notes. An optional check for thoughts of self-harm opens crisis resources when you use it.
- **Patterns:**
  - a cycle map and a 90-day trend line
  - the symptoms that rise most before your period
  - a before-and-after check of each period
  - a summary to copy for your clinician, and a CSV download
- **Care, Journal, Learn and Help now:** a treatment list, journal prompts, a note to yourself for harder days, plain-language PMDD information, and crisis lines.

Once Firebase is set up, the app works on any device with a browser:

- Each person signs in, and their log syncs to their own private account.
- It keeps working offline, and you can install it on a phone's home screen.

## How it's built

| Part | Service | Cost |
| --- | --- | --- |
| The app (one HTML page plus small support files) | GitHub Pages | Free with a public repository |
| Sign-in | Firebase Authentication | Free on the Spark plan for email and Google sign-in |
| Each person's log | Cloud Firestore | Free on the Spark plan up to its daily limits |

The app's code holds no one's data. Logs live only in Firestore. `firestore.rules` lets each signed-in person read and write only their own records.

Until Firebase is configured, the app runs in **device-only mode**: it works fully but saves entries in that browser only.

## Set up Firebase (about 10 minutes)

1. **Create a project.** Go to [console.firebase.google.com](https://console.firebase.google.com), choose **Create a project**, and name it (for example `tidemark`). Google Analytics isn't needed.
2. **Add a web app.** In Project settings, under **Your apps**, choose the web icon (`</>`) and register an app. Copy the `firebaseConfig` values it shows.
3. **Paste the config.** Open `firebase-config.js` in this repository, fill in each value between the quotes, and commit the change.
4. **Turn on sign-in.**
   1. Go to **Build → Authentication → Get started**.
   2. Under **Sign-in method**, enable **Email/Password** and **Google**.
   3. Under **Settings → Authorized domains**, add your site's domain, for example `yourname.github.io`.
5. **Create the database.**
   1. Go to **Build → Firestore Database → Create database**.
   2. Choose **production mode** and a location near your users. The location can't be changed later.
6. **Add the security rules.** On the Firestore **Rules** tab, replace everything with the contents of `firestore.rules`, then choose **Publish**.
7. **Test it.** Open the site, create an account, log a day, then sign in on another device. The entry should be there.

### Optional

- **Host on Firebase instead of GitHub Pages.** Run `firebase deploy` with the Firebase CLI; `firebase.json` is already set up. This also deploys the rules.
- **Watch your usage.** The Spark plan is free and has no billing attached. If you ever move to the pay-as-you-go Blaze plan, set a budget alert in Google Cloud.

## Publish on GitHub Pages

In the repository, go to **Settings → Pages**. Set the source to **Deploy from a branch**, with branch `main` and folder `/ (root)`.

The site appears at `https://<your-username>.github.io/<repository-name>/` within a minute or two. Every change you push to `main` updates it.

## Privacy and safety

This app stores sensitive health information, including optional answers about thoughts of self-harm. If people other than you will use it:

- **Tell users who can access their data.** Each person's log is private to their account inside the app. However, whoever owns the Firebase project can open the database in the Firebase console.
- **Publish a privacy policy** before inviting others. It should say what you collect, where it's stored, who can see it, and how people can delete it.
- **Keep the app free of trackers.** It ships with no analytics or advertising scripts.
- **Know the breach rules.** Consumer health apps usually fall outside HIPAA, but the US FTC Health Breach Notification Rule can apply. It requires notifying people, the FTC and sometimes the media after a breach. State health-privacy laws may also apply. Get legal advice before opening the app to the public.

Users can download all their entries as a CSV and delete all of their data from **Preferences**.

**Bringing in entries** (Preferences → Bring in entries) adds a backup saved from another copy of Tidemark, such as the version shared in Claude, which keeps entries in the browser. The person picks the backup file or pastes the backup code. Nothing is deleted: a day or journal entry saved in both places keeps the most recently saved version, treatments are matched by name and dose, and settings and the harder-days note only fill in what's missing. Signing out also clears the offline copy stored on that device.

**Delete my account** (Preferences → Account) asks the person to confirm with their password or Google sign-in, deletes every entry, then deletes the sign-in account. Apple and Google Play both require in-app account deletion for apps that let people create accounts. Google Play also needs a web page where people can ask for deletion without the app; the privacy policy's deletion section can serve as that page.

## Reminders

Preferences → **Reminders** adds a repeating daily check-in to Google Calendar, or downloads a calendar file for Apple Calendar or Outlook. Each comes with an alert at the chosen time. When a harder-days prediction exists, the same card can add a one-time heads-up two days before it. True push notifications need a server, such as Firebase Cloud Functions with Cloud Messaging on the paid Blaze plan, or local notifications in a native app store version.

Tidemark is a self-tracking tool. It doesn't diagnose or treat any condition.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The whole app: layout, styles, cycle math and screens |
| `firebase-config.js` | Your Firebase project settings (empty means device-only mode) |
| `firestore.rules` | Database rules: each person reaches only their own log |
| `firebase.json` | Settings for optional Firebase Hosting and rules deploys |
| `manifest.webmanifest`, `sw.js`, `icons/` | Home-screen install and offline support |

## Data layout

Each person's log is stored as a small set of documents under `users/{uid}/docs/` in Firestore:

| Document | Contents |
| --- | --- |
| `prefs` | Cycle length, safety check setting, support contact |
| `treatments` | The treatment list |
| `letter` | The note for harder days |
| `days-YYYY-MM` | One month of daily entries |
| `journal-YYYY-MM` | One month of journal entries |
