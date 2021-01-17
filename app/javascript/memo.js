function post (){
  //リクエストを送信する処理
  const submit = document.getElementById("submit");
  // ↪︎送信ボタンのIDを取得した

  // 送信ボタンを押すとイベントが発火するように設定
  submit.addEventListener("click", (e) => {

    e.preventDefault();
    // ↪︎これでAjax以外の投稿機能をさせないようにした（これがないと本来の挙動とAjaxが重複し重複した処理が行われる）

    const form = document.getElementById("form");
    // ↪︎フォームに入力された値を取得するためにフォームの要素を取得
    const formData = new FormData(form);
    // ↪︎FormDataオブジェクトを使って、フォームの値を取得
    // new FormData(フォームの要素);のように記述することでオブジェクトを生成し、
    // 引数にフォームの要素を渡すことで、そのフォームに入力された値を取得


    const XHR = new XMLHttpRequest();
    // XMLHttpRequestとは、ルーティングを送るときに使用するもの
    XHR.open("POST", "/posts", true);
    // openでどのようなリクエストにするか決める（createアクションを動かそうとしている）
    XHR.responseType = "json";
    // ↪︎リクエストを出す段階でどの形式でレスポンスを返したいのかを決めている。今回であればJSON形式
    XHR.send(formData);
    // ↪︎send：これでリクエストを送信している。（先程のフォームのデータも送っている）


    // ------------------------ここから下はコントローラーから帰ってきた後の処理------------------------

    const list = document.getElementById("list");

    const formText = document.getElementById("content");
    // ↪︎フォームの情報をIdから呼び出し代入

    // onloadはリクエストが無事に送られた後に呼び出されるもの
    XHR.onload = () => {

      // ------------------------正常に処理が行われなかった場合-------------------------------
      if (XHR.status != 200) {
        // ↪︎HTTPステータスコードが200以外の場合（つまりリクエストが成功しない場合）の条件式
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        // ↪︎この記述でJavaから抜け出し処理を中断させている
      }
      // ---------------------------------------------------------------------------------

      const item = XHR.response.post;
      // コントローラーからのレスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納しています。
      // ↪︎postはコントローラー内で定義

      // ここでHTMLに嵌め込みたいビューをhtmlに代入している
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;

        list.insertAdjacentHTML("afterend", html);
        // ↪︎上記で定義したlistの直後に嵌め込みたいhtmlを差し込んでいる

        // 第一引数にHTMLを挿入したい位置、第二引数に挿入したいHTMLを記述します。
        // beforebegin	要素の直前
        // afterbegin	要素内部の、最初の子要素の直前
        // beforeend	要素内部の、最後の子要素の直後
        // afterend	要素の直後

        formText.value = "";
        // ↪︎代入したformTextをからにすることで、投稿後フォームの中に文字が残る現象を解消している


    };
  });
 }
 
 window.addEventListener('load', post);