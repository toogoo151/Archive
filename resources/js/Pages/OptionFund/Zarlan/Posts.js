import React from "react";

const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h2>Уншиж байна......</h2>;
    }

    return (
        <section className="timeline-area">
            <div>
                {posts.map((post) => (
                    <h3 key={post.id} className="timeline">
                        <div className="timeline2">
                            <p className="test">
                                Нийтлэгч:&nbsp;
                                {post.firstName}
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                {post.created_at}
                            </p>
                        </div>

                        {post.RecommendationName && (
                            <div
                                className="image"
                                dangerouslySetInnerHTML={{
                                    __html: post.RecommendationName,
                                }}
                            ></div>
                        )}

                        {/* {post.ArticleMain} */}
                    </h3>
                ))}
            </div>
        </section>
    );
};

export default Posts;
