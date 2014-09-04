# The 'what time did my son wake up?' project

My 2 1/2 year old son wakes up before us during the spring and summer. He turns his light on fully, and plays until he's bored, then calls for us to join us in bed in the morning.

The problem was: exactly *when* was he waking, because it would affect how tired he was in the day (and affect nap times). So I built a tiny Arduino prototype :-) 

<!--more-->

## The grand plan

The grand plan was to use a TinyAT85 chip (because I like micro projects), with 4 digit 7 segment LED, a photoresistor, a push button (to reset) and a real time clock (RTC module). 

This would be in some sort of housing, and I'd use Sugru with their magnets to stick to his lamp. 

The idea being that the unit would attach magnetically to his lamp and be in a sleep state (though actually there's smarter approaches I could use to *actually* be in a sleep state). 

When the light is switched on, the photoresistor picks up a value higher than 950, and the time is displayed and fixed on the LED display. You then hit the reset button to go back to sleep state.

## The reality

7 segment LED displays, wired up regularly take up a *lot* of pins, even more so when there's four! This combined with the fact that TinyAT85 s only have 5 available pins for data, meant I'd need to use one of the adafruit LED backpacks (which I didn't have to hand), and then I didn't know if I could use an SPI pin with the SDA and SCL pins required to run the RTC module - so I decided to stick to the prototype for now.

## The prototype

I had a LCD module handy, which I'd use instead of the LED display. I also always prototype using an Arduino Uno, so it's simpler (and a lot bigger).

From there it was very simple. A lot of copy and paste from the adafruit website and then just writing the logic into my code:

* If the light sensor value goes above 850, then the light is on.
* Grab the time from the RTC module
* Display the time on the LCD
* If the push button is ‘LOW‘ then reset and clear the display
* As an additional bonus, if the light value drops below 300, it means the light is off, and reset (which saves pressing reset at night)

Here's the code: [light-time.pde](https://gist.github.com/remy/11264660#file-light-time-pde)

And the prototype wired up:

![ https://farm6.staticflickr.com/5333/13975246696_3d7bcc89e6_o.jpg]( https://farm6.staticflickr.com/5333/13975246696_3d7bcc89e6_o.jpg)

## The grand conclusion

After carefully wiring everything up, placing the arduino in my son's room and covering the lights so it wouldn't keep him up, I headed to bed keep to discover the time he was actually rising.

The morning came, he woke me and my wife up early (as expected), and I trotted into his room to discover...the battery had died.

Yep. Polling all the time is going to burn the battery out, and indeed what I need is an interrupt (based on the light levels ideally). So that's the plan for version 2...when I get around to it. For now, filling up failed projects!