@foreach ($posts as $post )
<div class="card2" style="margin-bottom:20px;">
    <div class="card2-header">
        <h5>Нийтэлсэн:&nbsp;{{$post->firstName}}<a href="#">{{$post->created_at}}</a></h5>
    </div>
    <div class="card2-body">

        <p>
            {{ strip_tags(str_replace('&nbsp;', ' ', str_replace('&quot;', ' ', str_replace('&rdquo;', ' ', str_replace('&ldquo;', ' ', $post->RecommendationName))))) }}
        </p>
    </div>
</div>
@endforeach
