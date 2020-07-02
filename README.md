# vue-study

[웹 게임을 만들며 배우는 Vue](https://www.inflearn.com/course/web-game-vue/dashboard)를 공부한 내용

<br>

### Vue, React 모두 바뀌는 것을 중심으로 생각해봐야 한다.

### 데이터만 관리하면 데이터에 따라 뷰를 그려주는건 `Vue.js` 가 처리한다.

```html
<body>
    <div id="root">
        <div v-if="liked">좋아요 눌렀음</div>
        <button v-else v-on:click="onClickButton">Like</button>
    </div>
</body>
<script>
    const app = new Vue({
        el : '#root',
        data : {
            liked: false,
        },
        methods: {
            onClickButton(){
                this.liked = true;  //this.liked는 data.liked 를 뜻함
            },
        },
    });
</script>
```

<br>

### `v-` 가 붙은 속성의 값에는 자바스크립트 코드를 사용할 수 있다.

```html
<body>
    <div id="root">
        <div v-if="liked + 1">좋아요 눌렀음</div>
        <button v-else v-on:click="onClickButton">Like</button>
    </div>
</body>
```

<br>

### 인접 형제는 붙어있어야 작동한다.

**인접하지 않은 예시**

인접하지 않은 v-if, v-else문은 적상 작동을 하지 않게 된다.

```html
<body>
    <div id="root">
        <div v-if="liked + 1">좋아요 눌렀음</div>
				<div>깍두기</div>
        <button v-else v-on:click="onClickButton">Like</button>
    </div>
</body>
<script>
    const app = new Vue({
        el : '#root',
        data : {
            liked: false,
        },
        methods: {
            onClickButton(){
                this.liked = true;  //this.liked는 data.liked 를 뜻함
            },
        },
    });
</script>
```