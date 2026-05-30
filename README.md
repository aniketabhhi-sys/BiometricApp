# 📱 Build Biometric APK via GitHub Actions

Follow these steps **exactly** — you'll have an installable APK in ~20 minutes, for free, with no software to install on your PC (except a browser).

---

## Prerequisites
- A **GitHub account** (free) → https://github.com
- An **Android phone** (Android 7.0+ / API 24+)

---

## Step 1 — Create a new GitHub repository

1. Go to https://github.com/new
2. Set:
   - **Repository name:** `BiometricApp`
   - **Visibility:** Private ✅ (recommended)
   - Do **NOT** check "Add a README"
3. Click **"Create repository"**

---

## Step 2 — Upload all project files

On the empty repo page, click **"uploading an existing file"** link.

Drag and drop the **entire `biometric-app` folder contents** (all files and folders).

Make sure these are present:
```
.github/
  workflows/
    build-apk.yml        ← GitHub Actions workflow
android/
  app/
    build.gradle
    proguard-rules.pro
    src/main/
      AndroidManifest.xml
      java/com/biometricapp/
        MainActivity.kt
        MainApplication.kt
      res/values/
        strings.xml
        styles.xml
  build.gradle
  gradle.properties
  settings.gradle
  gradle/wrapper/
    gradle-wrapper.properties
src/
  components/BiometricCamera.tsx
  hooks/useOfflineBiometrics.ts
  db/schema.ts
  utils/vectorMath.ts
  utils/livenessStateMachine.ts
  index.ts
App.tsx
app.json
babel.config.js
index.js
metro.config.js
package.json
tsconfig.json
```

4. Scroll down, click **"Commit changes"**

---

## Step 3 — Watch the build

1. Click the **"Actions"** tab at the top of your repo
2. You'll see **"Build Android APK"** running (yellow dot = in progress)
3. Click on it to watch live logs
4. Wait ~15–25 minutes for the build to complete ✅

> 💡 If it fails, click the failed step to see the error log and share it for help.

---

## Step 4 — Download the APK

1. Once the workflow shows a **green checkmark ✅**
2. Click on the workflow run
3. Scroll down to **"Artifacts"** section
4. Click **"BiometricApp-debug"** to download a ZIP file
5. Unzip it → you'll find `app-debug.apk`

---

## Step 5 — Install on your Android phone

### Enable installation from unknown sources:
- **Android 8+:** Settings → Apps → Special app access → Install unknown apps → allow your browser/file manager
- **Android 7:** Settings → Security → Unknown sources → ON

### Transfer and install the APK:
- Option A: Email it to yourself, open on phone, tap to install
- Option B: USB cable → copy to phone storage → open with file manager
- Option C: Upload to Google Drive → download on phone

### On your phone:
1. Open the APK file
2. Tap **"Install"**
3. Tap **"Open"**

---

## What the app does

- 📷 Opens front camera
- 🔍 Detects your face using Google ML Kit (on-device)
- ✨ Shows a randomised liveness challenge (Blink / Smile / Turn head)
- 🧠 Runs MobileFaceNet TFLite to generate your face embedding
- 🔐 Matches against the local SQLite database
- ✅ Authenticates — fully offline, no internet needed

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails at "Install npm dependencies" | Check package.json is correctly uploaded |
| Build fails at "assembleDebug" | Check android/build.gradle was uploaded |
| "App not installed" on phone | Enable "Install unknown apps" in phone settings |
| Camera permission denied | Go to Settings → Apps → BiometricApp → Permissions → Camera → Allow |
| Black screen on camera | Restart the app; grant camera permission when prompted |

---

## Re-triggering a build

Go to **Actions → Build Android APK → Run workflow** (top right) to manually trigger a new build anytime.
