import { GameEvent } from '../event'
import { Problem } from '../problem'

export const chap1 :GameEvent = new GameEvent()

chap1.name = '第一章：地铁安全员'

const prob :{[key:number]:Problem} = {
  1: {
    desc: '今天一大早，你被分配为地铁安全员'
  },
  2: {
    desc: '两节车厢之外好像有人在争吵'
  },
  3: {
    desc: '一个女的正和一个大叔争吵，气氛有些焦灼，你选择:',
    options: [
      {
        desc: '当没看见',
        trust: -10,
        fame: 0,
        result: '你选择无视，并且躲的远远的，后来发生了什么你也不太清楚',
        next: -1
      },
      {
        desc: '报警，交给警察处理',
        trust: -50,
        fame: 0,
        result: '你叫来了警察，但是两个当事人都下车走了...队长狠狠骂了你一顿，警告你下次别乱报警',
        next: -1
      },
      {
        desc: '上前制止',
        trust: 0,
        fame: 0,
        result: '你走上前去，现场乱糟糟一片，你有点搞不清楚状况',
        next: 4
      }
    ]
  },
  4: {
    desc: '双方隔空对骂，挺旁边的人说刚才已经动手了，你决定：',
    options: [
      {
        desc: '强势制止，让两位乘客下车解决',
        trust: 0,
        fame: 5,
        result: '你要求他们下车解决，不要影响其他乘客，周边乘客觉得你挺靠谱，投来赞许的目光',
        next: 5
      },
      {
        desc: '用爱解决，尝试和双方讲道理',
        trust: -30,
        fame: -10,
        result: '你并没有阻拦，他们两个愈演愈烈，又动起了手来',
        next: 8
      }
    ]
  },
  5: {
    desc: '男士同意了，但是女士拒绝下车，反复强调自己没有错',
    options: [
      {
        desc: '严正警告！！',
        trust: 0,
        fame: 10,
        result: '你非常严肃的对女士说：请立即下车，不要影响其他乘客乘车，有什么问题下车解决！',
        next: 6
      },
      {
        desc: '退一步，选择',
        trust: -30,
        fame: -5,
        next: -1,
        result: '你见对方不愿意下车，选择在车上沟通，女子情绪没有好转的迹象，其他乘客也变得非常烦躁，双方都在下一站下车了，下车前，女方记下来你的工号...'
      }
    ]
  },
  6: {
    desc: '女士非常生气！再次强调自己没有错！继续大声喧哗',
    options: [
      {
        desc: '尽量安抚双方情绪',
        trust: -10,
        fame: -20,
        result: '你选择拖字诀，双方在下一站都下车了，不过好像有人拍了视频，不知道会发到哪去...',
        next: -1
      },
      {
        desc: '试图把女士弄下车',
        trust: -100,
        fame: -80,
        next: -1,
        result: '你试图拉女士下车，但是拉的过程中女士强烈反抗，这段视频被发到了网上...'
      }
    ]
  },
  8:
    {
      desc: '两个人开始动手了，你：',
      options: [
        {
          desc: '介入拉架',
          trust: -20,
          fame: -10,
          result: '你用自己的身躯挡在他们中间，用身体护住处于劣势的女士，\n女士下车前还向你说了声谢谢，可是有人剪辑了视频上传到微博，\n视频中双手环住了女士，引起了一些争议',
          next: -1
        },
        {
          desc: '报警等警察来',
          trust: -10,
          fame: -10,
          result: '你没有选择拉架，而是紧急呼叫了警察，停车后警察及时赶到，你也解放了，但是好像有人说你是个花瓶',
          next: 8
        },
        {
          desc: '你们不要再打啦',
          trust: -100,
          fame: -40,
          result: '你不但不拉架，反而玩了个梗，没想到拍到并上传了微博，网友对你的工作态度很不满...',
          next: -1
        }
      ]
    }
}

for (const key in prob) {
  if (Object.prototype.hasOwnProperty.call(prob, key)) {
    const problem = prob[key]
    chap1.problems.set(parseInt(key), problem)
  }
}
