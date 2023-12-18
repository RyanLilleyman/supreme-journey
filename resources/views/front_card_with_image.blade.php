<!--I wrote this html to act as a front card if it has an image.-->
<div class ='forResultsFront' style="width: 100%; text-align: center">
    <img style="width: 100%; height:auto; margin-bottom: 10px; border-radius:0.5rem; max-width:460px; object-fit:cover;"
        srcset="{{ asset('storage/' . $imgUrl) }}" alt="Card Image">
    <br>
    <div>{{ $front }}</div>
    <br>
</div>
