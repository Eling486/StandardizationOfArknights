---
lang: zh-CN
title: 标准回放数据
description: 标准回放数据标准
---

# 标准回放数据

> 此标准是在参考官方代理指挥数据的基础上，进一步完善后制定的

## 数据标准

是一段JSON文本，应至少包括`replay_info`、`level_info`、`squad`、`log`四个字段，可在zip压缩后使用base64编码进行传输。

## replay_info

该字段包含回放的基本信息

有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|save_time|**是**|Int|回放数据生成的时间戳|
|version|否|Float|回放数据的版本|
|source|否|Object|回放的来源|
|author|否|Array|回放数据的作者|
|standard|**是**|String|回放所采用的标准|
|standard_time|否|Float|回放所需的完整时长（单位：秒）|
|result|否|Object|回放结果|

### 字段特殊说明

#### source

可包含以下任意字段，均为字符串：

`avid`: b站视频av号

`bvid`: b站视频bv号

`url`: 来源网站的链接

#### author

是由字符串组成的数组

#### standard

可取值：`timestamp`、`kill_count`、`multiple`，含义如下：

`timestamp`: 仅以时间戳作为战斗进度度量标准

`kill_count`: 仅以击杀数作为战斗进度度量标准

`multiple`: 包含有多种战斗进度度量标准，例如：同时使用`timestamp`、`kill_count`以及`特殊事件`

#### result

可包含以下字段，均为整数：

|字段|含义|
|----|----|
|grade|关卡完成情况<br />可取值：`0`（失败），`2`（有漏怪），`3`（3星通关）|
|remaining_life_point|剩余生命值|
|remaining_cost|剩余部署费用|

## level_info

该字段包含关卡的基本信息

有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|id|**是**|String|关卡的标准化ID|
|type|**是**|String|关卡的类型|
|name|否|Object|关卡的名称|
|map|否|Array|关卡地图的大小|
|extras|否|Object|关卡附加数据（危机合约等场景使用）|

### 字段特殊说明

#### id
关卡的标准化ID，见<a>标准化关卡ID</a>

#### type

可有以下取值：

|取值|含义|
|----|----|
|main|主线关卡|
|raid|突袭模式|
|hard|炼狱模式|
|sub|支线关卡|
|tough|磨难险地|
|memory|悖论模拟|
|promote|芯片关卡|
|rogue|肉鸽（集成战略）关卡|
|rune|危机合约关卡|
|training|教程关卡|
|weekly|资源关卡|
|activity|活动关卡|

#### name

可包含以下任意字段，均为字符串：

`en`: 关卡英文名称

`zh`: 关卡中文名称

#### map

关卡地图大小数组

总行数 为`x`，总列数 为`y`（均为整数类型）

格式为：[`x`, `y`]

注：以地图最左下角方格为[1, 1]（与官方代理指挥数据相统一）

#### extras

可包含以下字段：
`contracts`: 危机合约列表，格式见<a>标准化危机合约</a>

## squad

该字段包含回放所使用的干员信息

类型为一个无序数组，下可允许两种干员数据类型：`单一干员`和`系列干员`

### 单一干员

该类型有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|slot|**是**|Int|所占据干员槽位|
|type|**是**|String|干员数据类型，**该类型下取值为`char`**|
|char_info|**是**|Object|干员基本信息|
|skill|**是**|Object|干员技能信息|

#### 字段特殊说明

#### slot

常规槽位先从上至下、后从左至右依次为`1`-`12`，助战干员为`13`

#### char_info

可包含以下字段：

|字段|是否必须|类型|含义|
|----|-------|----|----|
|id|否|Int|干员数字ID|
|char_id|**是**|String|标准化干员ID|
|name|否|Object|干员名称，可包含子字段`en`和`zh`|
|stars|否|Int|干员星级，取值`1`-`6`|
|cost|否|Int|初始部署费用|
|phase|**是**|Int|精英化等级，取值`0`-`2`|
|level|**是**|Int|干员等级，根据精英化等级及干员星级不同，最大值不同|
|potential|**是**|Int|潜能`0`-`6`|
|trust|否|Int|信赖，取值：`0`-`100`|

- `char_id`: 取值见<a>标准化干员ID</a>
- `level`: 最小值为`1`，最大值规则见下表：

    |干员星级|初始阶段|精英一|精英二|
    |-------|--------|-----|------|
    |★|30|-|-|
    |★★|30|-|-|
    |★★★|40|55|-|
    |★★★★|45|60|70|
    |★★★★★|50|70|80|
    |★★★★★★|50|80|90|

- `trust`: 信赖对数值影响较小，但特殊情况下可以注明

#### skill

可包含以下字段：

|字段|是否必须|类型|含义|
|----|-------|----|----|
|index|**是**|Int|技能序号,即“几技能”，取值`1`-`3`|
|name|否|Object|技能名称，可包含子字段`en`和`zh`|
|rank|**是**|Int|技能等级，取值`1`-`7`|
|mastery|**是**|Int|技能专精等级，取值`0`-`3`|

### 系列干员

该类型有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|slot|**是**|Int|所占据干员槽位|
|type|**是**|String|干员数据类型，**该类型下取值为`series`**|
|series_info|**是**|Object|干员分类信息|
|skill|**是**|Object|干员技能信息|

#### 字段特殊说明

#### slot

常规槽位先从上至下、后从左至右依次为`1`-`12`，助战干员为`13`

#### series_info

可包含以下字段：

|字段|是否必须|类型|含义|
|----|-------|----|----|
|id|否|Int|系列干员数字ID|
|series_id|**是**|String|标准化系列干员ID|
|name|否|Object|系列干员类型名称，可包含子字段`en`和`zh`|
|stars|**是**|Int|干员星级，取值`1`-`6`|
|cost|**是**|Int|初始部署费用|
|phase|**是**|Int|精英化等级，取值`0`-`2`|
|level|**是**|Int|干员等级，根据精英化等级及干员星级不同，最大值不同|
|potential|**是**|Int|潜能`0`-`6`|
|trust|否|Int|信赖，取值：`0`-`100`|

- `series_id`: 取值见<a>标准化干员分类</a>
- `name`: 命名标准见<a>标准化干员分类</a>
- `level`: 最小值为`1`，最大值规则与**单一干员**`series_info`>`level`相同    
- `trust`: 信赖对数值影响较小，但特殊情况下可以注明

#### skill

可包含以下字段：

|字段|是否必须|类型|含义|
|----|-------|----|----|
|type|**是**|String|技能类型ID，取值见<a>标准化技能分类</a>|
|rank|**是**|Int|技能等级，取值`1`-`7`|
|mastery|**是**|Int|技能专精等级，取值`0`-`3`|

## log

为一个有序数组，包含多个Object元素，每种元素代表一步操作，根据战斗进度度量标准可分为：`timestamp`、`kill_count`和`特殊事件`

### 不同类型日志的数据结构

#### timestamp

该类型有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|type|**是**|String|日志类型，**该类型下取值为`timestamp`**|
|timestamp|**是**|Float|进行操作的时间点（相对于关卡开始时刻），单位：秒|
|operation|**是**|String|所进行的操作，取值见<a href="/standards/replay.html#不同操作及其所需附加数据">不同操作及其所需附加数据</a>|
|data|**是**|Object|操作附加数据|

#### kill_count

该类型有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|type|**是**|String|日志类型，**该类型下取值为`kill_count`**|
|kill_count|**是**|Float|进行操作的时的杀敌数|
|delay|否|Float|到达杀敌数后执行操作的延时（推迟操作），单位：秒|
|operation|**是**|String|所进行的操作，取值见<a href="/standards/replay.html#不同操作及其所需附加数据">不同操作及其所需附加数据</a>|
|data|**是**|Object|操作附加数据|

#### 特殊事件

特殊事件一般用于监听，当监听到事件发生后再执行操作，例如，当技力满后再开技能

- `until_available`: 在部署费用满足所需或技力蓄满后执行操作

该类型有以下子字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|type|**是**|String|日志类型，**该类型下取值为`until_available`**|
|timeout|否|Float|操作超时时间（最长等待时长），单位：秒|
|delay|否|Float|到达杀敌数后执行操作的延时（推迟操作），单位：秒|
|operation|**是**|String|所进行的操作，取值见<a href="/standards/replay.html#不同操作及其所需附加数据">不同操作及其所需附加数据</a>|
|data|**是**|Object|操作附加数据|

### 不同操作及其所需附加数据

以下为`operation`的取值以及相关解释

#### deploy

> 部署干员

同时，`data`应包含以下字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|char_id|否|String|标准化干员ID|
|series_id|否|Float|标准化系列干员ID|
|direction|**是**|String|摆放朝向|
|pos|**是**|Array|部署位置|
|cost|**是**|Int|消耗部署费用（为正值）|

注：
- 必需包含 `char_id` 与 `series_id` 中的其一
- `direction`: 取值及对应: `north`: 向上， `south`: 向下， `west`: 向左， `east`: 向右
- `pos`: 为一有序数组，格式为：[`x`, `y`]（行数 为`x`，列数 为`y`，均为整数类型），以地图最左下角方格为[1, 1]（与官方代理指挥数据相统一）

#### skill

> 使用干员（或召唤物）技能

同时，`data`应包含以下字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|char_id|否|String|标准化干员ID|
|pos|否|Array|干员位置|

注：
- `char_id` 与 `pos` 应至少包含其一，以能确定干员（或召唤物）位置为准

#### function

> 使用地图中装置

同时，`data`应包含以下字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|machine_id|否|String|<a>标准化装置ID</a>|
|pos|否|Array|装置位置|

注：
- `machine_id` 与 `pos` 应至少包含其一，以能确定装置位置为准

#### evacuate

> 撤离干员（或召唤物）

同时，`data`应包含以下字段：
|字段|是否必须|类型|含义|
|----|-------|----|----|
|char_id|否|String|标准化干员ID|
|series_id|否|Float|标准化系列干员ID|
|pos|否|Array|部署位置|
|cost|**是**|Int|返还的部署费用（为负值）|

注：
- `pos`、`char_id` 与 `series_id` 应至少包含其一，以能确定干员（或召唤物）位置为准

## 范例

``` json
{
    "replay_info": {
        "save_time": 1631159114,
        "version": 1.0,
        "source": {
            "bvid": "BVj1G32ysF1t",
            "avid": "23333333",
            "url": "http://example.com/sdGshHfs"
        },
        "author": [
            "Author"
        ],
        "standard": "multiple",
        "standard_time": 2000.003,
        "result": {
            "grade": 3,
            "remaining_life_point": 10,
            "remaining_cost": 85
        }
    },
    "level_info": {
        "id": "level_main_01-07",
        "type": "main",
        "name": {
            "en": "",
            "zh": "暴君"
        },
        "map": [
            10,
            5
        ],
        "extras": {
            "contracts": []
        }
    },
    "squad": [
        {
            "slot": 1,
            "type": "char",
            "char_info": {
                "id": 102,
                "char_id": "char_102_texas",
                "name": {
                    "en": "Texas",
                    "zh": "德克萨斯"
                },
                "stars": 5,
                "cost": 13,
                "phase": 2,
                "level": 70,
                "potential": 6,
                "trust": 100
            },
            "skill": {
                "index": 1,
                "name": {
                    "en": "",
                    "zh": "冲锋号角·γ型"
                },
                "rank": 7,
                "mastery": 3
            }
        },
        {
            "slot": 2,
            "type": "series",
            "series_info": {
                "id": 8,
                "series_id": "series_id",
                "name": {
                    "en": "",
                    "zh": "元素治疗"
                },
                "stars": 4,
                "cost": 13,
                "phase": 2,
                "level": 70,
                "potential": 6,
                "trust": 100
            },
            "skill": {
                "type": 2,
                "rank": 7,
                "mastery": 0
            }
        }
    ],
    "log": [
        {
            "type": "timestamp",
            "timestamp": 4.066663,
            "operation": "deploy",
            "data": {
                "char_id": "char_123_fang",
                "direction": "east",
                "pos": [4, 4],
				"cost": 8
            }
        },
        {
            "type": "kill_count",
            "kill_count": 1,
            "delay": 2.382710,
            "operation": "deploy",
            "data": {
                "char_id": "char_149_scave",
                "direction": "east",
                "pos": [4, 3],
                "cost": 10
            }
        },
        {
            "type": "until_available",
            "timeout": 10.234232,
            "delay": 2.382710,
            "operation": "skill",
            "data": {
                "char_id": "char_149_scave",
                "pos": [4, 3]
            }
        },
        {
            "type": "timestamp",
            "timestamp": 96.054233,
            "operation": "function",
            "data": {
                "machine_id": "",
                "pos": [4, 3]
            }
        },
        {
            "type": "timestamp",
            "timestamp": 157.372613,
            "operation": "evacuate",
            "data": {
                "char_id": "char_149_scave",
                "pos": [4, 3],
                "cost": -5
            }
        }
    ]
}
```