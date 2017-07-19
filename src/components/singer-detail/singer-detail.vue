<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs">
        </music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from 'components/music-list/music-list'
    import {getSingerDetail} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'     //创建歌曲信息方法
    import {mapGetters} from 'vuex'     //使用Vuex中的 mapGetters 辅助函数

    export default {
        computed: {
            title() {                 //music-list需要用到的数据
                return this.singer.name
            },
            bgImage() {              //music-list需要用到的数据
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'              //对应到store中的getters.js的singer
            ])
        },
        data() {
            return {
                songs: []
            }
        },
        created() {
            //console.log(this.singer)
            this._getDetail()
        },
        methods: {
            _getDetail() {
                if (!this.singer.id) {          //获取不到id回退
                    this.$router.push('/singer')
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        //console.log(res.data)
                        this.songs = this._normalizeSongs(res.data.list)
                        //console.log(this.songs )
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
