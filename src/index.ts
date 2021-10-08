import Page from '@smartface/native/ui/page';

type BuilderCallback = ((builder: JitsiMeetBuilder) => void);

/**
 * @class
 * @copyright Smartface 2021
 * @example
 * ```
 * import { JitsiMeetBuilder, JitsiMeetUserInfo,  default as JitsiMeet} from '@smartface/plugin-jitsimeet';
 * let builderCallback = (builder: JitsiMeetBuilder): void => {
 *     builder.serverURL = "https://meet.jit.si";
 *     builder.room = "smartfacetest";
 *     builder.welcomePageEnabled = true;
 * };
 * let jitsi = new JitsiMeet(builderCallback);
 *
 * jitsi.show(this);
 * ```
 */
export default class JitsiMeet {
    private jitsiPage: JitsiPage;

    constructor(builderCallback: BuilderCallback) {
        this.jitsiPage = new JitsiPage(builderCallback)
    }

    /**
	 * Called when a conference was joined.
	 *
	 * @method conferenceJoined
	 * @param {Function} value
	 */
    set conferenceJoined(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.conferenceJoined = value;
    }

    /**
	 * Called when a conference was terminated either by user choice or due to a failure.
	 *
	 * @method conferenceTerminated
	 * @param {Function} value
	 */
    set conferenceTerminated(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.conferenceTerminated = value;
    }

    /**
	 * Called before a conference is joined.
	 *
	 * @method conferenceWillJoin
	 * @param {Function} value
	 */
    set conferenceWillJoin(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.conferenceWillJoin = value;
    }

    /**
	 * Called when a participant has joined the conference.
	 *
	 * @method participantJoined
	 * @param {Function} value
	 */
    set participantJoined(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.participantJoined = value;
    }

    /**
	 * Called when a participant has left the conference.
	 *
	 * @method participantLeft
	 * @param {Function} value
	 */
    set participantLeft(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.participantLeft = value;
    }


    /**
	 * Called when audioMuted state changed.
	 *
	 * @method audioMutedChanged
	 * @param {Function} value
	 */
    set audioMutedChanged(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.audioMutedChanged = value;
    }

    /**
	 * Called when an endpoint text message is received.
	 *
	 * @method endpointTextMessageReceived
	 * @param {Function} value
	 */
    set endpointTextMessageReceived(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.endpointTextMessageReceived = value;
    }

    /**
	 * Called when a chat message is received.
	 *
	 * @method screenShareToggled
	 * @param {Function} value
	 */
    set screenShareToggled(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.screenShareToggled = value;
    }

    /**
	 * Called when a chat message is received.
	 *
	 * @method chatMessageReceived
	 * @param {Function} value
	 */
    set chatMessageReceived(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.chatMessageReceived = value;
    }

    /**
	 * Called when the chat dialog is displayed/hidden.
	 *
	 * @method chatToggled
	 * @param {Function} value
	 */
    set chatToggled(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.chatToggled = value;
    }

    /**
	 * Called when videoMuted state changed.
	 *
	 * @method videoMutedChanged
	 * @param {Function} value
	 */
    set videoMutedChanged(value: Function) {
        this.jitsiPage.jitsiMeetViewDelegate.videoMutedChanged = value;
    }

    /**
	 * Shows jitsi-meet constructed page.
	 *
	 * @method show
	 * @param {Page} page
	 */
    show(page: Page) {
        //@ts-ignore
        page.nativeObject.presentViewController(this.jitsiPage.nativeObject);
    }

    /**
	 * Dismiss page.
	 *
	 * @method close
	 */
    close() {
        //@ts-ignore
        this.jitsiPage.nativeObject.dismissViewController(function () { }, true);
    }
}

export class JitsiMeetBuilder {
    nativeObject: any;
    private _userInfo!: JitsiMeetUserInfo;
    private _serverURL!: string;

    get userInfo(): JitsiMeetUserInfo {
        return this._userInfo;
    }

    set userInfo(value: JitsiMeetUserInfo) {
        this._userInfo = value;
        //@ts-ignore
        let avatar = value.avatar ? __SF_NSURL.URLWithString(value.avatar) : undefined;
        //@ts-ignore
        var userInfo = __SF_JitsiMeetUserInfo.createWithDisplayNameAndEmailAndAvatar(
            value.displayName,
            value.email,
            avatar
        );
        this.nativeObject._userInfo = userInfo;
    }

    get serverURL(): string {
        return this._serverURL;
    }

    set serverURL(value: string) {
        this._serverURL = value;
        //@ts-ignore
        this.nativeObject.serverURL = __SF_NSURL.URLWithString(value);
    }

    get room(): string {
        return this.nativeObject.room;
    }

    set room(value: string) {
        this.nativeObject.room = value;
    }

    get subject(): string {
        return this.nativeObject.subject;
    }
    set subject(value: string) {
        this.nativeObject.subject = value;
    }

    get token(): string {
        return this.nativeObject.token;
    }
    set token(value: string) {
        this.nativeObject.token = value;
    }
    get audioOnly(): boolean {
        return this.nativeObject.audioOnly;
    }
    set audioOnly(value: boolean) {
        this.nativeObject.audioOnly = value;
    }
    get audioMuted(): boolean {
        return this.nativeObject.audioMuted;
    }
    set audioMuted(value: boolean) {
        this.nativeObject.audioMuted = value;
    }
    get videoMuted(): boolean {
        return this.nativeObject.videoMuted;
    }
    set videoMuted(value: boolean) {
        this.nativeObject.videoMuted = value;
    }
    get colorScheme(): object {
        return this.nativeObject.colorScheme;
    }
    set colorScheme(value: object) {
        this.nativeObject.colorScheme = value;
    }
    get welcomePageEnabled(): boolean {
        return this.nativeObject.welcomePageEnabled;
    }
    set welcomePageEnabled(value: boolean) {
        this.nativeObject.welcomePageEnabled = value;
    }

    /**
	 * Sets the feature flag as boolean type.
	 *
	 * @method setBooleanFeatureFlag
     * @param {string} flag
     * @param {boolean} value
     * @see {@link https://github.com/smartface/sf-plugin-jitsi-meet}
	 */
    setBooleanFeatureFlag(flag: string, value: boolean): void {
        if (this.nativeObject) {
            this.nativeObject.setFeatureFlagWithBoolean(flag, value);
        }
    };

    /**
	 * Sets the feature flag as any type.
	 *
	 * @method setBooleanFeatureFlag
     * @param {string} flag
     * @param {any} value
     * @see {@link https://github.com/smartface/sf-plugin-jitsi-meet}
	 */
    setAnyFeatureFlag(flag: string, value: any): void {
        if (this.nativeObject) {
            this.nativeObject.setFeatureFlagWithValue(flag, value);
        }
    }
}

export class JitsiMeetUserInfo {
    displayName!: string;
    email!: string;
    avatar!: string;
}

class JitsiPage extends Page {
    public jitsiMeetViewDelegate: any;
    constructor(builderCallback: BuilderCallback) {
        super();

        //@ts-ignore
        this.jitsiMeetViewDelegate = new __SF_SMFJitsiMeetViewDelegate();
        //@ts-ignore
        this.nativeObject.onViewLoad = () => {
            //@ts-ignore
            let options = __SF_JitsiMeetConferenceOptions.createOptionsFromBuilder((builder) => {
                let jsBuilder = new JitsiMeetBuilder();
                jsBuilder.nativeObject = builder;
                builderCallback(jsBuilder);
            });

            //@ts-ignore
            let jitsiView = new __SF_JitsiMeetView();
            jitsiView.delegate = this.jitsiMeetViewDelegate
            jitsiView.join(options);
            return jitsiView;
        }

    }
}