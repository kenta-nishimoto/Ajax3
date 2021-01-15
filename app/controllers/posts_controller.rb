class PostsController < ApplicationController

  #上記のPostsがrouteで設定したコントローラー名
  #下記のindexはroutesで設定したインデックス名

  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index  #投稿後リダイレクトさせている
  end

end
