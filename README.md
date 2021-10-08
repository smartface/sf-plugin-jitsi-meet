# Jitsi Meet Smartface Plugin
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE)

## Jitsi Meet

WebRTC compatible JavaScript application that uses Jitsi Videobridge to provide high quality, scalable video conferences. Build upon React and React Native.

It's wrapper plugin for Smartface. 

## Installation
Smartface JitsiMeet plugin can be installed via npm easily from our public npm repository

- Run command in terminal `(cd ~/workspace/scripts && npm i -S @smartface/plugin-jitsimeet)`


### Android

Currently, Android isn't supported.

### Feature Flags

The mobile SDK supports a number of feature flags which allow for customizing certain UI aspects and behavior.

Here are the currently implemented flags:

- add-people.enabled: Flag indicating if add-people functionality should be enabled. Default: enabled (true).
- android.audio-focus.disabled: Flag indicating if the SDK should not require the audio focus. Used by apps that do not use Jitsi audio. Default: disabled (false).
- audio-mute.enabled: Flag indicating if the audio mute button should be displayed. Default: enabled (true).
- calendar.enabled: Flag indicating if calendar integration should be enabled. Default: enabled (true) on Android, auto-detected on iOS.
- call-integration.enabled: Flag indicating if call integration (CallKit on iOS, ConnectionService on Android) should be enabled. Default: enabled (true).
- close-captions.enabled: Flag indicating if close captions should be enabled. Default: enabled (true).
- conference-timer.enabled: Flag indicating if conference timer should be enabled. Default: enabled (true).
- chat.enabled: Flag indicating if chat should be enabled. Default: enabled (true).
- filmstrip.enabled: Flag indicating if the filmstrip should be enabled. Default: enabled (true).
- invite.enabled: Flag indicating if invite functionality should be enabled. Default: enabled (true).
- ios.recording.enabled: Flag indicating if recording should be enabled in iOS. Default: disabled (false).
- ios.screensharing.enabled: Flag indicating if screen sharing should be enabled in iOS. Default: disabled (false).
- kick-out.enabled: Flag indicating if kickout is enabled. Default: enabled (true).
- live-streaming.enabled: Flag indicating if live-streaming should be enabled. Default: auto-detected.
- meeting-name.enabled: Flag indicating if displaying the meeting name should be enabled. Default: enabled (true).
- meeting-password.enabled: Flag indicating if the meeting password button should be enabled. Note that this flag just decides on the buttton, if a meeting has a password set, the password ddialog will still show up. Default: enabled (true).
- notifications.enabled: Flag indicating if the notifications should be enabled. Default: enabled (true).
- overflow-menu.enabled: Flag indicating if the audio overflow menu button should be displayed. Default: enabled (true).
- pip.enabled: Flag indicating if Picture-in-Picture should be enabled. Default: auto-detected.
- raise-hand.enabled: Flag indicating if raise hand feature should be enabled. Default: enabled.
- recording.enabled: Flag indicating if recording should be enabled. Default: auto-detected.
- resolution: Flag indicating the local and (maximum) remote video resolution. Overrides the server configuration. Default: (unset).
- server-url-change.enabled: Flag indicating if server URL change is enabled. Default: enabled (true)
- tile-view.enabled: Flag indicating if tile view feature should be enabled. Default: enabled.
- toolbox.alwaysVisible: Flag indicating if the toolbox should be always be visible. Default: disabled (false).
- toolbox.enabled: Flag indicating if the toolbox should be enabled. Default: enabled.
- video-mute.enabled: Flag indicating if the video mute button should be displayed. Default: enabled (true).
- video-share.enabled: Flag indicating if the video share button should be enabled. Default: enabled (true).
- welcomepage.enabled: Flag indicating if the welcome page should be enabled. Default: disabled (false).

All flags are defined [here](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/flags/constants.js).

### Sample
```typescript

import Page1Design from "generated/pages/page2";
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "@smartface/native/device/system";
import {
  JitsiMeetBuilder,
  JitsiMeetUserInfo,
  default as JitsiMeet,
} from "@smartface/plugin-jitsimeet";

export default class Page2 extends Page1Design {
  router: any;

  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.btnSayHello.onPress = () => {
    
      if (System.OS === System.OSType.IOS) {
      
        // Jitsi Meet Usage ------------
        let builderCallback = (builder: JitsiMeetBuilder): void => {
          builder.serverURL = "https://meet.jit.si";
          builder.room = "smartfacetest";
          builder.welcomePageEnabled = true;

          let userInfo = new JitsiMeetUserInfo();
          userInfo.displayName = "usersmartfacetest";
          userInfo.email = "smartface@email.com";
          userInfo.avatar =
            "https://smartface.io/wp-content/uploads/2016/02/logo_new_blue2.png";
          builder.userInfo = userInfo;

          builder.setBooleanFeatureFlag("help.enabled", false);
          builder.setBooleanFeatureFlag("raise-hand.enabled", false);
          builder.setBooleanFeatureFlag("live-streaming.enabled", false);
          builder.setBooleanFeatureFlag("video-share.enabled", false);
          builder.setBooleanFeatureFlag("tile-view.enabled", false);
          builder.setBooleanFeatureFlag("security-options.enabled", false);
          builder.setBooleanFeatureFlag("reactions.enabled", false);
          builder.setBooleanFeatureFlag("chat.enabled", false);
          builder.setBooleanFeatureFlag("invite.enabled", false);
          builder.setBooleanFeatureFlag("add-people.enabled", false);
          builder.setBooleanFeatureFlag("audio-only.enabled", false);
          builder.setBooleanFeatureFlag("kick-out.enabled", false);
          builder.setBooleanFeatureFlag("lobby-mode.enabled", false);
          builder.setBooleanFeatureFlag("meeting-password.enabled", false);

          builder.colorScheme = {
            Conference: {
              onVideoText: "rgb(0, 0, 0)",
            },
            LoadConfigOverlay: {
              background: "rgb(255, 0, 0)",
              text: "rgb(255, 0, 0)",
            },
            Modal: {
              background: "rgb(255, 0, 0)",
              text: "rgb(255, 0, 0)",
            },
            Toolbox: {
              button: "#FF0000",
              buttonToggled: "#FF0000",
              buttonToggledBorder: "#FF0000",
            },
            Dialog: {
              buttonBackground: "rgb(0, 255, 0)",
              buttonLabel: "rgb(255, 255, 0)",
            },
            Header: {
              background: "#FF0000",
              text: "#00FF00",
            },
          };
        };
        let jitsi = new JitsiMeet(builderCallback);

        jitsi.conferenceTerminated = function (data) {
          console.log("conferenceTerminated : ", data);
          jitsi.close();
        };

        jitsi.conferenceWillJoin = function (data) {
          console.log("conferenceWillJoin : ", data);
        };
        jitsi.participantJoined = function (data) {
          console.log("participantJoined : ", data);
        };
        jitsi.participantLeft = function (data) {
          console.log("participantLeft : ", data);
        };
        jitsi.audioMutedChanged = function (data) {
          console.log("audioMutedChanged : ", data);
        };
        jitsi.endpointTextMessageReceived = function (data) {
          console.log("endpointTextMessageReceived : ", data);
        };
        jitsi.screenShareToggled = function (data) {
          console.log("screenShareToggled : ", data);
        };
        jitsi.chatMessageReceived = function (data) {
          console.log("chatMessageReceived : ", data);
        };
        jitsi.chatToggled = function (data) {
          console.log("chatToggled : ", data);
        };
        jitsi.videoMutedChanged = function (data) {
          console.log("videoMutedChanged : ", data);
        };

        jitsi.show(this);
      }
    };
  }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(this: Page2, superOnShow: () => void) {
  superOnShow();
  this.headerBar.titleLayout.applyLayout();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(this: Page2, superOnLoad: () => void) {
  superOnLoad();
  console.info("Onload page1");
  this.headerBar.leftItemEnabled = false;
  this.headerBar.titleLayout = new PageTitleLayout();
  componentContextPatch(this.headerBar.titleLayout, "titleLayout");
  if (System.OS === "Android") {
    this.headerBar.title = "";
  }
}


```

# License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
