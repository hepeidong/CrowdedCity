/**************
 * created:		2018/8/31
 * author:      
 * purpose:		音频管理器
 */

let GameFile = require('GameFile');

let SoundManager = (function () {
    let _setData = null;
    function constructor() {
        return {
            displayId: null,
            displayUrl: null,
            displayAudio: null,
            audioSC: null,
            isPlaying: false,

            stopBGM: function () {
                this.displayId = null;
                this.displayUrl = null;
                cc.audioEngine.stopAll();
            },

            pauseAll: function () {
                cc.audioEngine.pauseAll();
            },

            resumeAll: function () {
                cc.audioEngine.resumeAll();
            },

            pause: function (audioId) {
                if (audioId != null) cc.audioEngine.pause(audioId);
                else cc.audioEngine.pause(this.displayId);
            },

            resume: function (audioId) {
                if (audioId != null) cc.audioEngine.resume(audioId);
                else cc.audioEngine.pause(this.displayId);
            },

            //关闭背景音乐
            closeBGM: function () {
                _setData.musicOpen = false;
            },

            //打开背景音乐
            openBGM: function () {
                _setData.musicOpen = true;
            },

            //关闭音效
            closeSFX: function () {
                _setData.soundOpen = false;
            },

            //打开音效
            openSFX: function () {
                _setData.soundOpen = true;
            },

            isMusicPlaying: function () {
                // return cc.audioEngine.isMusicPlaying();
                if (this.displayId > 0) {
                    cc.audioEngine.setFinishCallback(this.displayId, () => {
                        this.isPlaying = false;
                    });
                }
                return this.isPlaying;
            },
            setFinishCallback: function (cb) {
                cc.audioEngine.setFinishCallback(this.displayId, cb);
            },
            //背景音乐
            playBGM: function () {
                this.playMusic('Sound/common/bg_zc', true);
            },

            //失败背景音乐
            playFailBGM: function () {
                this.playMusic('Sound/common/shibai', false);
            },
            //胜利背景音乐
            playWinBGM: function () {
                this.playMusic('Sound/common/shengli', false);
            },

            isMusicPlaying: function () {
                // return cc.audioEngine.isMusicPlaying();
                if (this.displayId > 0) {
                    cc.audioEngine.setFinishCallback(this.displayId, () => {
                        this.isPlaying = false;
                    });
                }
                return this.isPlaying;
            },
            setFinishCallback: function (cb) {
                cc.audioEngine.setFinishCallback(this.displayId, cb);
            },

            bgmDuration: function () {
                if (this.displayId) return cc.audioEngine.getDuration(this.displayId);
                return null;
            },

            //播放音乐
            playMusic: function (url, isLoop) {
                if (this.displayUrl == url) {
                    return;
                }
                let self = this;
                this.displayUrl = url;
                if (this.displayId > 0) {
                    // cc.audioEngine.stopMusic();
                    cc.audioEngine.stop(this.displayId);
                }

                cc.loader.loadRes(this.displayUrl, cc.AudioClip, function (err, audioClip) {
                    let volume = _setData.musicOpen == true ? _setData.musicVolume : 0;
                    self.displayAudio = audioClip;
                    self.isPlaying = true;
                    // cc.audioEngine.setMusicVolume(self.displayId, volume);
                    // self.displayId = cc.audioEngine.playMusic(self.displayAudio, isLoop);
                    self.displayId = cc.audioEngine.play(self.displayAudio, isLoop, volume);
                });
            },

            //背景音乐音量
            musicVolume: function (v) {
                if (v != _setData.musicVolume)
                {
                    _setData.musicVolume = v;
                    GameFile.Instance.writeJS_GameSetMap(_setData);
                    cc.audioEngine.setVolume(this.displayId, v);
                }
            },

            getURL: function (url) {
                return cc.url.raw('resources/Sound/' + url + '.mp3');
            },

            getMJUrl: function (url) {
                return cc.url.raw("resources/Sound/Majiang/" + url);
            },

            //游戏音效
            playAudioSFX: function (url) {
                let volume = _setData.soundOpen == true ? _setData.soundVolume : 0;
                let audioDis = new cc.AudioSource();
                audioDis.clip = this.getURL(url);
                audioDis.volume = volume;
                audioDis.play();
            },

            //点击按钮音效
            playClickSFX: function () {
                let volume = _setData.soundOpen == true ? _setData.soundVolume : 0;
                let audioDis = new cc.AudioSource();
                audioDis.clip = this.getURL('common/audio_button_click');
                audioDis.volume = volume;
                audioDis.play();
            },

            playSendCardSFX() {
                let volume = _setData.soundOpen == true ? _setData.soundVolume : 0;
                if (this.audioSC == null) this.audioSC = new cc.AudioSource();
                this.audioSC.clip = this.getURL('common/send_card');
                this.audioSC.volume = volume;
                // this.audioSC.loop = true;
                this.audioSC.play();
            },

            stopSendCardSFX() {
                if (this.audioSC == null) return;
                this.audioSC.stop();
            },

            playSFX(url) {
                var audioUrl = this.getMJUrl(url);
                let volume = _setData.soundOpen == true ? _setData.soundVolume : 0;
                let audioDis = new cc.AudioSource();
                audioDis.clip = audioUrl;
                audioDis.volume = volume;
                audioDis.play();
            },

            setSFXVolume: function (v) {
                _setData.soundVolume = v;
                GameFile.Instance.writeJS_GameSetMap(_setData);
            },
        }
    }
    function _init() {
        // if (isWechatGame()) {
        //     wx.onAudioInterruptionBegin(() => {
        //         cc.audioEngine.pauseAll();
        //     });

        //     wx.onAudioInterruptionEnd(() => {
        //         cc.audioEngine.resumeAll();
        //         cc.game.emit(cc.game.EVENT_SHOW);
        //     });
        // }

        _setData = GameFile.Instance.readJS_GameSetMap();
        if (!_setData) return false;

        return true;
    }
    return {
        Instance: null,
        getInstance: function () {
            if (SoundManager.Instance == null) {
                SoundManager.Instance = constructor();
                if (!_init()) {
                    SoundManager.Instance = null;
                }
            }
            return SoundManager.Instance;
        },
    }
})();

module.exports = SoundManager;