function post (){
  //リクエストを送信する処理
  const submit = document.getElementById("submit");
  // ↪︎送信ボタンのIDを取得した

  // 送信ボタンを押すとイベントが発火するように設定
  submit.addEventListener("click", (e) => {

    e.preventDefault();
    ↪︎これでAjax以外の投稿機能をさせないようにした（これがないと本来の挙動とAjaxが重複し重複した処理が行われる）

    const form = document.getElementById("form");
    // ↪︎フォームに入力された値を取得するためにフォームの要素を取得
    const formData = new FormData(form);
    // ↪︎FormDataオブジェクトを使って、フォームの値を取得
    // new FormData(フォームの要素);のように記述することでオブジェクトを生成し、
    // 引数にフォームの要素を渡すことで、そのフォームに入力された値を取得


    const XHR = new XMLHttpRequest();
    // XMLHttpRequestとは、ルーティングを送るときに使用するもの
    XHR.open("POST", "/posts", true);
    // openでどのようなリクエストにするか決める
    XHR.responseType = "json";
    // ↪︎リクエストを出す段階でどの形式でレスポンスを返したいのかを決めている。今回であればJSON形式
    XHR.send(formData);
    // ↪︎send：これでリクエストを送信している。（先程のフォームのデータも送っている）


  });


 }
 
 window.addEventListener('load', post);