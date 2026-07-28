# Mobile Simulator Setup for Claude Code

**Owner:** Cowork  
**Priority:** High  
**Status:** Setup Guide  
**Applies to:** React Native development on macOS

---

## Objective

Prepare each developer Mac so Claude Code can build, launch, inspect, and troubleshoot the Factory mobile companion on both iOS and Android.

Andrew and Austin already use iPhones and TestFlight. TestFlight remains the real-device iOS validation path, but local simulators are still required for fast development, visual checks, build debugging, and cross-platform testing.

---

## Required Testing Stack

```text
Developer Mac
├── Xcode
│   └── iPhone Simulator
│
└── Android Studio
    └── Android Emulator
        └── Android Virtual Device (AVD)
```

Physical devices:

```text
Andrew and Austin's iPhones
└── TestFlight builds for real-device iOS validation

Physical Android device
└── Recommended before a public Google Play release
```

Android Studio and the Android Virtual Device are installed on the Mac. They are not installed on an iPhone, and an iPhone cannot run an Android emulator.

---

# 1. iOS Setup

## Install Xcode

Install Xcode from the Mac App Store:

- https://apps.apple.com/us/app/xcode/id497799835

Apple documentation:

- https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators
- https://developer.apple.com/documentation/xcode/downloading-and-installing-additional-xcode-components
- https://developer.apple.com/documentation/xcode/running-your-app-on-simulated-or-physical-devices

The Apple Developer app by itself is not enough. Xcode supplies:

- iPhone Simulator
- iOS SDKs and simulator runtimes
- `xcodebuild`
- native compilers
- signing and provisioning tools
- command-line tools required by React Native iOS builds

## Complete first launch

After Xcode downloads:

1. Open Xcode.
2. Accept the license agreement.
3. Allow Xcode to install additional components.
4. Open Xcode Settings and confirm an iOS simulator runtime is installed.
5. Launch Simulator once.

Verify from Terminal:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
xcodebuild -version
xcrun simctl list devices available
open -a Simulator
```

Do not run `sudo xcodebuild -license accept` blindly if Xcode has already handled the license interactively. Use it only when the command-line tools report that the license still needs acceptance.

## React Native iOS commands

For a React Native CLI project:

```bash
npx react-native run-ios
```

For Expo:

```bash
npx expo start
```

Then press:

```text
i
```

Claude Code should verify that the application builds, installs, opens, and renders correctly in Simulator.

## TestFlight role

TestFlight is not a substitute for Simulator. Use both:

- Simulator for rapid development and repeatable local testing.
- TestFlight on Andrew and Austin's iPhones for real-device behavior.

Real iPhones are especially important for:

- push notifications
- camera and photo access
- Bluetooth
- location behavior
- permissions
- performance
- background behavior
- physical keyboard and touch interactions

---

# 2. Android Setup

## Install Android Studio

Official download:

- https://developer.android.com/studio

Official Mac installation guide:

- https://developer.android.com/studio/install

Android Virtual Device documentation:

- https://developer.android.com/studio/run/managing-avds

React Native environment setup:

- https://reactnative.dev/docs/set-up-your-environment

Install Android Studio separately on Andrew's and Austin's Macs.

During the setup wizard, install or confirm:

- Android SDK
- Android SDK Platform
- Android SDK Build Tools
- Android SDK Command-line Tools
- Android Emulator
- platform tools, including `adb`

## Select the correct Mac download

For Apple silicon Macs, choose the Mac download identified for an Apple chip or ARM architecture.

For Intel Macs, choose the Intel Mac build.

Check the Mac processor at:

```text
Apple menu → About This Mac
```

## Create an Android Virtual Device

From the Android Studio welcome screen:

```text
More Actions → Virtual Device Manager
```

From an open project:

```text
View → Tool Windows → Device Manager
```

Then:

1. Select **Create Virtual Device**.
2. Choose a recent Pixel phone profile.
3. Choose a current stable Android system image supported by the React Native project.
4. On Apple silicon, use an ARM64 system image.
5. Prefer a Google APIs or Google Play image when the application needs Google services.
6. Finish the device configuration.
7. Press the Play button to boot the emulator.

Recommended first device:

```text
Recent Pixel phone
Current stable Android API supported by the project
Google APIs or Google Play image
ARM64 image on Apple silicon
```

Start with one reliable AVD. Add a smaller-screen Android device later for responsive-layout testing.

## Verify Android command-line access

With the emulator running:

```bash
adb devices
```

Expected output resembles:

```text
List of devices attached
emulator-5554    device
```

List configured AVDs:

```bash
emulator -list-avds
```

Launch one from Terminal:

```bash
emulator @YOUR_AVD_NAME
```

The Android SDK tools may need to be added to the shell path. A common Apple silicon or modern macOS configuration is:

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
```

Place those exports in the active shell configuration, commonly `~/.zshrc`, then reload it:

```bash
source ~/.zshrc
```

Verify:

```bash
adb version
emulator -version
```

## React Native Android commands

For a React Native CLI project:

```bash
npx react-native run-android
```

For Expo:

```bash
npx expo start
```

Then press:

```text
a
```

Claude Code should verify that the Android application builds, installs, opens, and renders correctly in the emulator.

---

# 3. Recommended Claude Code Workflow

```text
Claude Code changes the React Native project
    ↓
Run project checks and native builds
    ↓
Launch iPhone Simulator
    ↓
Launch Android Emulator
    ↓
Inspect both layouts and platform behavior
    ↓
Capture build errors, runtime logs, and screenshots
    ↓
Correct platform-specific defects
    ↓
Cowork and Designer audit desktop-visible simulator results
    ↓
Publish iOS candidate through TestFlight
    ↓
Andrew and Austin test on physical iPhones
    ↓
Test on at least one physical Android before public Android release
```

Claude Code should not report mobile work as finished after testing only one platform.

---

# 4. Definition of Finished

A React Native mobile change is finished only when all applicable checks pass:

## iOS

- iOS native dependencies install successfully.
- The iOS project builds without errors.
- The app installs and opens in iPhone Simulator.
- The primary user flow is exercised in Simulator.
- Layout is checked on at least one modern iPhone simulator size.
- Real-device behavior is checked through TestFlight when the change touches hardware, permissions, notifications, background behavior, or release configuration.

## Android

- Android native dependencies and Gradle configuration resolve successfully.
- The Android project builds without errors.
- The app installs and opens in the Android Emulator.
- The primary user flow is exercised in the AVD.
- Layout is checked on at least one modern Pixel-size emulator.
- Android-specific navigation, permissions, keyboard behavior, and back behavior are checked.
- A physical Android test is completed before public Google Play release.

## Shared

- No platform is assumed correct because the other platform works.
- Build and runtime failures are captured with exact commands and logs.
- Screenshots are reviewed for visible defects.
- Safe areas, keyboards, loading states, empty states, errors, and orientation requirements are checked where applicable.
- Andrew remains the release and merge gate.

---

# 5. Common Troubleshooting Commands

## iOS

```bash
xcodebuild -version
xcode-select -p
xcrun simctl list devices available
open -a Simulator
```

## Android

```bash
adb devices
adb logcat
emulator -list-avds
sdkmanager --list
```

## React Native

```bash
node --version
npm --version
npx react-native doctor
```

For Expo projects:

```bash
npx expo-doctor
```

Use the project's package manager and lockfile consistently. Do not switch between npm, Yarn, pnpm, or Bun without an explicit project decision.

---

# 6. Security and Repository Rules

- Never commit Apple signing certificates, provisioning profiles, Android keystores, passwords, API keys, or service-account credentials.
- Keep local SDK paths and machine-specific settings out of shared configuration unless the project explicitly supports them.
- Do not commit generated build directories.
- Do not publish simulator or device logs containing tokens, personal information, or production secrets.
- All code and configuration changes remain pull-request only.
- Andrew remains the sole merge gate.

---

# 7. Setup Acceptance Checklist

Each developer Mac is ready when:

- [ ] Xcode is installed and opened successfully.
- [ ] An iOS simulator runtime is installed.
- [ ] `xcodebuild -version` succeeds.
- [ ] `xcrun simctl list devices available` shows at least one iPhone.
- [ ] Simulator launches.
- [ ] Android Studio is installed and opened successfully.
- [ ] Android SDK, platform tools, emulator, and command-line tools are installed.
- [ ] At least one Android Virtual Device is created.
- [ ] The Android emulator boots.
- [ ] `adb devices` shows the emulator as `device`.
- [ ] The React Native app launches on iOS Simulator.
- [ ] The React Native app launches on Android Emulator.
- [ ] TestFlight remains available on Andrew and Austin's iPhones for real-device iOS validation.

---

## Governance Reminder

Simulators accelerate development, but they do not change Factory governance.

Claude Code may build, test, diagnose, and propose changes. Cowork and Designer may review. Andrew remains the sole merge gate, and no seat merges production code.
