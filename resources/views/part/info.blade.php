@php
  // use Carbon\Carbon;
@endphp
<div class="titles">Бидний тухай</div>
<div class="last_news">
  <ul>
    @foreach ($lastPosts as $lastPost)
      @php
        // $diff = $lastPost->date->diffForHumans(null, true, true, 2);
      @endphp
      <li>
      <div class="l_item" >
        <div class="l_item_img">
          @if($lastPost->featuredImage == null)
            <img src="{{url("/images/noimage.jpg")}}" />
          @else
            <img src="{{$lastPost->featuredImage}}" />
          @endif
          <a href="{{url("/info/onePost")}}/{{$lastPost->id}}"> </a>
        </div>
        <div class="l_title">
          <a href="#">{{$lastPost->title}}</a>
        </div>
        <div class="l_readmore"> <a href="{{url("/info/onePost")}}/{{$lastPost->id}}">Дэлгэрэнгүй</a> </div>
        <div class="l_dates"> <i class="fas fa-clock"></i>{{substr($lastPost->date,0,10)}}   &emsp; &emsp;
        {{-- <i class="fa fa-eye"></i> {{$lastPost->readCount}}  --}}
         </div>
      </div>
      </li>
    @endforeach
  </ul>
</div> <!-- news end -->

<div class="row text-center">{{$lastPosts->links()}} </div>

<style>
  .last_news{
    animation: scale-entrance 2s ease-in-out both;
  }
  @keyframes scale-entrance{
    0%{
    transform: scale(0);

}
100%{
    transform: scale(1);
}
  }
  </style>
