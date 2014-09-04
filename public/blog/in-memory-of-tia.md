# In memory of Tia

When Tia was born last year, through the pain of losing her, Julie and I promised ourselves that something good must come of this tragedy.
<!--more-->
In recent months we have been working on *Tia's Trees* - a project to improve our local park joined to a children's centre, as a memorial to our baby girl.

During Phase One, with friends and family, we managed to plant over 100 new trees and shrubs ([photos](http://www.flickr.com/photos/jules-s/sets/72157626308202466/with/5543506716/), some just baby trees and some more developed. This phase is now complete, but we hope the work won't stop there.

As part of Phase Two we aim to install new benches in time for the summer to make the park more accessible and more comfortable for local families. Further phases have been planned with the support of the local council, and we expect this project to last a number of years.

We have set up a fundraising page where donations go 50% to the Tia's Trees project and 50% to [SANDS](http://www.uk-sands.org/) - the UK charity that provide support to families who have lost their babies. 

If you wished to donate, Julie and I would really appreciate it:

<p><a href="http://www.virginmoneygiving.com/tiastrees">http://www.virginmoneygiving.com/tiastrees</a> <span id="raised"></span></p>

<p id="raised"></p>

It's been the hardest time of our lives, but I know that the support that has come out from family, friends and the web community has been truly overwhelming. We've been touched by messages people have sent us, and the thoughts spared for our family and Tia. 

We'll never *get over* losing our baby girl, but we get stronger with each day and somehow, with time, we have managed to start our lives again creating a *new normal* and now almost fully re-entered the real world.

Thank you for all your support.

<script> 
function yqldata(data) {
  if (data.query.count > 0) {
    if (data.query.results.div.p) {
      document.getElementById('raised').innerHTML = '(raised so far: <span>' + data.query.results.div.p + ')';
    }
  }
}
</script> 
<script src="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fuk.virginmoneygiving.com%2FTiasTrees%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40class%3D%22total%22%5D'&format=json&callback=yqldata"></script>