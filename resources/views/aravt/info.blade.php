@php
  // use Carbon\Carbon;
@endphp
<div class="titles">Аравт</div>
<div class="last_news">
  <ul>
    @foreach ($DateNews as $DateNew)
      @php
        // $diff = $lastPost->date->diffForHumans(null, true, true, 2);
      @endphp
      <li>
      <div class="l_item" >
        <div class="l_item_img">
          @if($DateNew->featuredImage == null)
            <img src="{{url("/images/noimage.jpg")}}" />
          @else
            <img src="{{$DateNew->featuredImage}}" />
          @endif
          <a href="{{url("/aravt/onePost")}}/{{$DateNew->id}}"> </a>
        </div>
        <div class="l_title">
          <a href="#">{{$DateNew->title}}</a>
        </div>
        <div class="l_readmore"> <a href="{{url("/aravt/onePost")}}/{{$DateNew->id}}">Дэлгэрэнгүй</a> </div>
        <div class="l_dates"> <i class="fas fa-clock"></i>{{substr($DateNew->created_at,0,10)}}   &emsp; &emsp;
        <i class="fa fa-eye"></i> {{$DateNew->readCount}}
         </div>
      </div>
      </li>
    @endforeach
  </ul>
</div> <!-- news end -->

<div class="row text-center">{{$DateNews->links()}} </div>

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
