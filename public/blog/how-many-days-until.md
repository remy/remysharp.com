# How many days until...

Time is a fun and challenging technical problem to solve, and most recently I had to answer the question: how many days is it until Christmas?

This post is an over the top deep dive into the complexities of accurately answering a question, which boils down to: a ball of wibbly wobbly… time-y wimey… stuff.

<video loop muted autoplay width="680">
  <source src="/images/time.mp4" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
</video>

Christmas religious (or commercial!) feelings aside, this question, although simple from one human to another, when broken down has lots of complicated moving parts.

I had made a LaMetric countdown to Christmas that displayed the number of days to Christmas, which worked for me, but with all software, didn't work completely right all of the time.

<!--more-->

![Christmas countdown clock](/images/xmas-clock.jpg)

## In code, how many days?

The code below is the simplistic answer to "how many days until Christmas":

```js
const toDays = ms => ms / 1000 / 60 / 60 / 24;

const today = new Date(); // assume 2018-12-15 10:30:00
const target = new Date(`${today.getFullYear()}-12-25 00:00:00`);

toDays(target - today); // about 9.565944 days
```

Yes, the above code is extremely simplistic and bug ridden.

## What's a day?

Say, for instance, that today is the 24th December. The question: _how many days until the 25th_ can be correctly answered in two ways:

1. One day
2. None

Technically correct is zero days, since less than 24 hours equals zero days. This is fine if working with hours, minutes and seconds, but since I want to display a human readable value, the display would say "0 days" to Christmas, a reader would understandably either be confused, wonder if this day is the 25th or raising a bug.

I asked my 7 year old son the same question, and his first answer was one day, then after a moment, zero days, then he wasn't sure.

For a human readable time, I believe the appropriate answer is "1 day" to Christmas (and sure, counting in "sleeps" is a lot easier!). This shows already that the algorithm I'll use needs to calculate the days needs to artificially round the days _up_.

## Updated to "whole" days

The change needs to happen in my `toDays` function. Normally to round a number, I'll use a bitwise OR `|` operation - which I learnt about at jsconf 2009 as a "fast" way to get the value I want. Except the `value | 0` operation actually _floors_ the value and doesn't round it. The flooring method works fine with positive values (in this particular case), but when it comes to negative values, it gets a bit unexpected particularly as -0.9 floored is actually -0, which for JavaScript is zero - whereas I would prefer the value -1 to be rounded from -0.9 (specifically as I need to refer to days).

```js
const toDays = ms => Math.round(ms / 1000 / 60 / 60 / 24 + 1);

const today = new Date(); // assume 2018-12-15 10:30:00
const target = new Date(`${today.getFullYear()}-12-25 00:00:00`);

toDays(target - today); // 10 days
```

## Not everyone lives in the UK

Imagine my delight and surprise when I found that my countdown clock was being used by someone out in San Francisco. First of all that's great. Second of all: the countdown will only be right for _some_ of the time for that person 😱.

As my server has it's clock set to UTC+0 and during December UK time is GMT+0 which _happens_ to be UTC+0, the countdown is correct _for me_ when I view it in the UK. However, when viewed in San Francisco, it will say it's Christmas day from 4pm on Christmas eve, and we really can't have that.

The next task is: if I can get your location (by asking), can I work out the timezone adjustment?

## v1: "just ask the user"

The UI for the countdown could ask the user what timezone they're on.

But that's riddled with problems. Sure, from a computer's point of view, UTC+5 is fine, but who in their right might is going to enter their timezone like that? Or even from a dropdown list, not everyone is going to know. Maybe UTC isn't obvious and we offer GMT+5, but again it's not **obvious**.

Perhaps there's a list of the timezones by name? There's "only" [200 of them](https://en.m.wikipedia.org/wiki/List_of_time_zone_abbreviations). Then there's things like PST is both Pacific Standard Time - UTC-8 and Philippine Standard Time - UTC+8 - a pretty big difference if you select the wrong one.

Not so good.

## v2: Names are better than numbers

How about instead the user offers their timezone as text? The [PHP timezone documentation](http://php.net/manual/en/timezones.php) lists all the timezones by "standard" name.

There's an officially maintained database of timezone _names_ and their offset (copied [into Wikipedia](https://en.m.wikipedia.org/wiki/List_of_tz_database_time_zones) for easy access).

The user _could_ write their city, like "Chicago" and it could be matched up to the closest name, and then we'd have the timezone. Except: typos and then Christmas is incorrectly reported and the kids get upset!

So back to a dropdown…and that is unwieldy…much!

<select><option>Enjoy 590 options 😱</option><option>Africa/Abidjan</option><option>Africa/Accra</option><option>Africa/Addis_Ababa</option><option>Africa/Algiers</option><option>Africa/Asmara</option><option>Africa/Bamako</option><option>Africa/Bangui</option><option>Africa/Banjul</option><option>Africa/Bissau</option><option>Africa/Blantyre</option><option>Africa/Brazzaville</option><option>Africa/Bujumbura</option><option>Africa/Cairo</option><option>Africa/Casablanca</option><option>Africa/Ceuta</option><option>Africa/Conakry</option><option>Africa/Dakar</option><option>Africa/Dar_es_Salaam</option><option>Africa/Djibouti</option><option>Africa/Douala</option><option>Africa/El_Aaiun</option><option>Africa/Freetown</option><option>Africa/Gaborone</option><option>Africa/Harare</option><option>Africa/Johannesburg</option><option>Africa/Juba</option><option>Africa/Kampala</option><option>Africa/Khartoum</option><option>Africa/Kigali</option><option>Africa/Kinshasa</option><option>Africa/Lagos</option><option>Africa/Libreville</option><option>Africa/Lome</option><option>Africa/Luanda</option><option>Africa/Lubumbashi</option><option>Africa/Lusaka</option><option>Africa/Malabo</option><option>Africa/Maputo</option><option>Africa/Maseru</option><option>Africa/Mbabane</option><option>Africa/Mogadishu</option><option>Africa/Monrovia</option><option>Africa/Nairobi</option><option>Africa/Ndjamena</option><option>Africa/Niamey</option><option>Africa/Nouakchott</option><option>Africa/Ouagadougou</option><option>Africa/Porto-Novo</option><option>Africa/Sao_Tome</option><option>Africa/Timbuktu</option><option>Africa/Tripoli</option><option>Africa/Tunis</option><option>Africa/Windhoek</option><option>America/Adak</option><option>America/Anchorage</option><option>America/Anguilla</option><option>America/Antigua</option><option>America/Araguaina</option><option>America/Argentina/Buenos_Aires</option><option>America/Argentina/Catamarca</option><option>America/Argentina/ComodRivadavia</option><option>America/Argentina/Cordoba</option><option>America/Argentina/Jujuy</option><option>America/Argentina/La_Rioja</option><option>America/Argentina/Mendoza</option><option>America/Argentina/Rio_Gallegos</option><option>America/Argentina/Salta</option><option>America/Argentina/San_Juan</option><option>America/Argentina/San_Luis</option><option>America/Argentina/Tucuman</option><option>America/Argentina/Ushuaia</option><option>America/Aruba</option><option>America/Asuncion</option><option>America/Atikokan</option><option>America/Atka</option><option>America/Bahia</option><option>America/Bahia_Banderas</option><option>America/Barbados</option><option>America/Belem</option><option>America/Belize</option><option>America/Blanc-Sablon</option><option>America/Boa_Vista</option><option>America/Bogota</option><option>America/Boise</option><option>America/Buenos_Aires</option><option>America/Cambridge_Bay</option><option>America/Campo_Grande</option><option>America/Cancun</option><option>America/Caracas</option><option>America/Catamarca</option><option>America/Cayenne</option><option>America/Cayman</option><option>America/Chicago</option><option>America/Chihuahua</option><option>America/Coral_Harbour</option><option>America/Cordoba</option><option>America/Costa_Rica</option><option>America/Creston</option><option>America/Cuiaba</option><option>America/Curacao</option><option>America/Danmarkshavn</option><option>America/Dawson</option><option>America/Dawson_Creek</option><option>America/Denver</option><option>America/Detroit</option><option>America/Dominica</option><option>America/Edmonton</option><option>America/Eirunepe</option><option>America/El_Salvador</option><option>America/Ensenada</option><option>America/Fort_Nelson</option><option>America/Fort_Wayne</option><option>America/Fortaleza</option><option>America/Glace_Bay</option><option>America/Godthab</option><option>America/Goose_Bay</option><option>America/Grand_Turk</option><option>America/Grenada</option><option>America/Guadeloupe</option><option>America/Guatemala</option><option>America/Guayaquil</option><option>America/Guyana</option><option>America/Halifax</option><option>America/Havana</option><option>America/Hermosillo</option><option>America/Indiana/Indianapolis</option><option>America/Indiana/Knox</option><option>America/Indiana/Marengo</option><option>America/Indiana/Petersburg</option><option>America/Indiana/Tell_City</option><option>America/Indiana/Vevay</option><option>America/Indiana/Vincennes</option><option>America/Indiana/Winamac</option><option>America/Indianapolis</option><option>America/Inuvik</option><option>America/Iqaluit</option><option>America/Jamaica</option><option>America/Jujuy</option><option>America/Juneau</option><option>America/Kentucky/Louisville</option><option>America/Kentucky/Monticello</option><option>America/Knox_IN</option><option>America/Kralendijk</option><option>America/La_Paz</option><option>America/Lima</option><option>America/Los_Angeles</option><option>America/Louisville</option><option>America/Lower_Princes</option><option>America/Maceio</option><option>America/Managua</option><option>America/Manaus</option><option>America/Marigot</option><option>America/Martinique</option><option>America/Matamoros</option><option>America/Mazatlan</option><option>America/Mendoza</option><option>America/Menominee</option><option>America/Merida</option><option>America/Metlakatla</option><option>America/Mexico_City</option><option>America/Miquelon</option><option>America/Moncton</option><option>America/Monterrey</option><option>America/Montevideo</option><option>America/Montreal</option><option>America/Montserrat</option><option>America/Nassau</option><option>America/New_York</option><option>America/Nipigon</option><option>America/Nome</option><option>America/Noronha</option><option>America/North_Dakota/Beulah</option><option>America/North_Dakota/Center</option><option>America/North_Dakota/New_Salem</option><option>America/Ojinaga</option><option>America/Panama</option><option>America/Pangnirtung</option><option>America/Paramaribo</option><option>America/Phoenix</option><option>America/Port_of_Spain</option><option>America/Port-au-Prince</option><option>America/Porto_Acre</option><option>America/Porto_Velho</option><option>America/Puerto_Rico</option><option>America/Punta_Arenas</option><option>America/Rainy_River</option><option>America/Rankin_Inlet</option><option>America/Recife</option><option>America/Regina</option><option>America/Resolute</option><option>America/Rio_Branco</option><option>America/Rosario</option><option>America/Santa_Isabel</option><option>America/Santarem</option><option>America/Santiago</option><option>America/Santo_Domingo</option><option>America/Sao_Paulo</option><option>America/Scoresbysund</option><option>America/Shiprock</option><option>America/Sitka</option><option>America/St_Barthelemy</option><option>America/St_Johns</option><option>America/St_Kitts</option><option>America/St_Lucia</option><option>America/St_Thomas</option><option>America/St_Vincent</option><option>America/Swift_Current</option><option>America/Tegucigalpa</option><option>America/Thule</option><option>America/Thunder_Bay</option><option>America/Tijuana</option><option>America/Toronto</option><option>America/Tortola</option><option>America/Vancouver</option><option>America/Virgin</option><option>America/Whitehorse</option><option>America/Winnipeg</option><option>America/Yakutat</option><option>America/Yellowknife</option><option>Antarctica/Casey</option><option>Antarctica/Davis</option><option>Antarctica/DumontDUrville</option><option>Antarctica/Macquarie</option><option>Antarctica/Mawson</option><option>Antarctica/McMurdo</option><option>Antarctica/Palmer</option><option>Antarctica/Rothera</option><option>Antarctica/South_Pole</option><option>Antarctica/Syowa</option><option>Antarctica/Troll</option><option>Antarctica/Vostok</option><option>Arctic/Longyearbyen</option><option>Asia/Aden</option><option>Asia/Almaty</option><option>Asia/Amman</option><option>Asia/Anadyr</option><option>Asia/Aqtau</option><option>Asia/Aqtobe</option><option>Asia/Ashgabat</option><option>Asia/Ashkhabad</option><option>Asia/Atyrau</option><option>Asia/Baghdad</option><option>Asia/Bahrain</option><option>Asia/Baku</option><option>Asia/Bangkok</option><option>Asia/Barnaul</option><option>Asia/Beirut</option><option>Asia/Bishkek</option><option>Asia/Brunei</option><option>Asia/Calcutta</option><option>Asia/Chita</option><option>Asia/Choibalsan</option><option>Asia/Chongqing</option><option>Asia/Chungking</option><option>Asia/Colombo</option><option>Asia/Dacca</option><option>Asia/Damascus</option><option>Asia/Dhaka</option><option>Asia/Dili</option><option>Asia/Dubai</option><option>Asia/Dushanbe</option><option>Asia/Famagusta</option><option>Asia/Gaza</option><option>Asia/Harbin</option><option>Asia/Hebron</option><option>Asia/Ho_Chi_Minh</option><option>Asia/Hong_Kong</option><option>Asia/Hovd</option><option>Asia/Irkutsk</option><option>Asia/Istanbul</option><option>Asia/Jakarta</option><option>Asia/Jayapura</option><option>Asia/Jerusalem</option><option>Asia/Kabul</option><option>Asia/Kamchatka</option><option>Asia/Karachi</option><option>Asia/Kashgar</option><option>Asia/Kathmandu</option><option>Asia/Katmandu</option><option>Asia/Khandyga</option><option>Asia/Kolkata</option><option>Asia/Krasnoyarsk</option><option>Asia/Kuala_Lumpur</option><option>Asia/Kuching</option><option>Asia/Kuwait</option><option>Asia/Macao</option><option>Asia/Macau</option><option>Asia/Magadan</option><option>Asia/Makassar</option><option>Asia/Manila</option><option>Asia/Muscat</option><option>Asia/Novokuznetsk</option><option>Asia/Novosibirsk</option><option>Asia/Omsk</option><option>Asia/Oral</option><option>Asia/Phnom_Penh</option><option>Asia/Pontianak</option><option>Asia/Pyongyang</option><option>Asia/Qatar</option><option>Asia/Qyzylorda</option><option>Asia/Rangoon</option><option>Asia/Riyadh</option><option>Asia/Saigon</option><option>Asia/Sakhalin</option><option>Asia/Samarkand</option><option>Asia/Seoul</option><option>Asia/Shanghai</option><option>Asia/Singapore</option><option>Asia/Srednekolymsk</option><option>Asia/Taipei</option><option>Asia/Tashkent</option><option>Asia/Tbilisi</option><option>Asia/Tehran</option><option>Asia/Tel_Aviv</option><option>Asia/Thimbu</option><option>Asia/Thimphu</option><option>Asia/Tokyo</option><option>Asia/Tomsk</option><option>Asia/Ujung_Pandang</option><option>Asia/Ulaanbaatar</option><option>Asia/Ulan_Bator</option><option>Asia/Urumqi</option><option>Asia/Ust-Nera</option><option>Asia/Vientiane</option><option>Asia/Vladivostok</option><option>Asia/Yakutsk</option><option>Asia/Yangon</option><option>Asia/Yekaterinburg</option><option>Asia/Yerevan</option><option>Atlantic/Azores</option><option>Atlantic/Bermuda</option><option>Atlantic/Canary</option><option>Atlantic/Cape_Verde</option><option>Atlantic/Faeroe</option><option>Atlantic/Faroe</option><option>Atlantic/Jan_Mayen</option><option>Atlantic/Madeira</option><option>Atlantic/Reykjavik</option><option>Atlantic/South_Georgia</option><option>Atlantic/St_Helena</option><option>Atlantic/Stanley</option><option>Australia/ACT</option><option>Australia/Adelaide</option><option>Australia/Brisbane</option><option>Australia/Broken_Hill</option><option>Australia/Canberra</option><option>Australia/Currie</option><option>Australia/Darwin</option><option>Australia/Eucla</option><option>Australia/Hobart</option><option>Australia/LHI</option><option>Australia/Lindeman</option><option>Australia/Lord_Howe</option><option>Australia/Melbourne</option><option>Australia/North</option><option>Australia/NSW</option><option>Australia/Perth</option><option>Australia/Queensland</option><option>Australia/South</option><option>Australia/Sydney</option><option>Australia/Tasmania</option><option>Australia/Victoria</option><option>Australia/West</option><option>Australia/Yancowinna</option><option>Brazil/Acre</option><option>Brazil/DeNoronha</option><option>Brazil/East</option><option>Brazil/West</option><option>Canada/Atlantic</option><option>Canada/Central</option><option>Canada/Eastern</option><option>Canada/Mountain</option><option>Canada/Newfoundland</option><option>Canada/Pacific</option><option>Canada/Saskatchewan</option><option>Canada/Yukon</option><option>CET</option><option>Chile/Continental</option><option>Chile/EasterIsland</option><option>CST6CDT</option><option>Cuba</option><option>EET</option><option>Egypt</option><option>Eire</option><option>EST</option><option>EST5EDT</option><option>Etc/GMT</option><option>Etc/GMT+0</option><option>Etc/GMT+1</option><option>Etc/GMT+10</option><option>Etc/GMT+11</option><option>Etc/GMT+12</option><option>Etc/GMT+2</option><option>Etc/GMT+3</option><option>Etc/GMT+4</option><option>Etc/GMT+5</option><option>Etc/GMT+6</option><option>Etc/GMT+7</option><option>Etc/GMT+8</option><option>Etc/GMT+9</option><option>Etc/GMT0</option><option>Etc/GMT-0</option><option>Etc/GMT-1</option><option>Etc/GMT-10</option><option>Etc/GMT-11</option><option>Etc/GMT-12</option><option>Etc/GMT-13</option><option>Etc/GMT-14</option><option>Etc/GMT-2</option><option>Etc/GMT-3</option><option>Etc/GMT-4</option><option>Etc/GMT-5</option><option>Etc/GMT-6</option><option>Etc/GMT-7</option><option>Etc/GMT-8</option><option>Etc/GMT-9</option><option>Etc/Greenwich</option><option>Etc/UCT</option><option>Etc/Universal</option><option>Etc/UTC</option><option>Etc/Zulu</option><option>Europe/Amsterdam</option><option>Europe/Andorra</option><option>Europe/Astrakhan</option><option>Europe/Athens</option><option>Europe/Belfast</option><option>Europe/Belgrade</option><option>Europe/Berlin</option><option>Europe/Bratislava</option><option>Europe/Brussels</option><option>Europe/Bucharest</option><option>Europe/Budapest</option><option>Europe/Busingen</option><option>Europe/Chisinau</option><option>Europe/Copenhagen</option><option>Europe/Dublin</option><option>Europe/Gibraltar</option><option>Europe/Guernsey</option><option>Europe/Helsinki</option><option>Europe/Isle_of_Man</option><option>Europe/Istanbul</option><option>Europe/Jersey</option><option>Europe/Kaliningrad</option><option>Europe/Kiev</option><option>Europe/Kirov</option><option>Europe/Lisbon</option><option>Europe/Ljubljana</option><option>Europe/London</option><option>Europe/Luxembourg</option><option>Europe/Madrid</option><option>Europe/Malta</option><option>Europe/Mariehamn</option><option>Europe/Minsk</option><option>Europe/Monaco</option><option>Europe/Moscow</option><option>Europe/Nicosia</option><option>Europe/Oslo</option><option>Europe/Paris</option><option>Europe/Podgorica</option><option>Europe/Prague</option><option>Europe/Riga</option><option>Europe/Rome</option><option>Europe/Samara</option><option>Europe/San_Marino</option><option>Europe/Sarajevo</option><option>Europe/Saratov</option><option>Europe/Simferopol</option><option>Europe/Skopje</option><option>Europe/Sofia</option><option>Europe/Stockholm</option><option>Europe/Tallinn</option><option>Europe/Tirane</option><option>Europe/Tiraspol</option><option>Europe/Ulyanovsk</option><option>Europe/Uzhgorod</option><option>Europe/Vaduz</option><option>Europe/Vatican</option><option>Europe/Vienna</option><option>Europe/Vilnius</option><option>Europe/Volgograd</option><option>Europe/Warsaw</option><option>Europe/Zagreb</option><option>Europe/Zaporozhye</option><option>Europe/Zurich</option><option>GB</option><option>GB-Eire</option><option>GMT</option><option>GMT+0</option><option>GMT0</option><option>GMT−0</option><option>Greenwich</option><option>Hongkong</option><option>HST</option><option>Iceland</option><option>Indian/Antananarivo</option><option>Indian/Chagos</option><option>Indian/Christmas</option><option>Indian/Cocos</option><option>Indian/Comoro</option><option>Indian/Kerguelen</option><option>Indian/Mahe</option><option>Indian/Maldives</option><option>Indian/Mauritius</option><option>Indian/Mayotte</option><option>Indian/Reunion</option><option>Iran</option><option>Israel</option><option>Jamaica</option><option>Japan</option><option>Kwajalein</option><option>Libya</option><option>MET</option><option>Mexico/BajaNorte</option><option>Mexico/BajaSur</option><option>Mexico/General</option><option>MST</option><option>MST7MDT</option><option>Navajo</option><option>NZ</option><option>NZ-CHAT</option><option>Pacific/Apia</option><option>Pacific/Auckland</option><option>Pacific/Bougainville</option><option>Pacific/Chatham</option><option>Pacific/Chuuk</option><option>Pacific/Easter</option><option>Pacific/Efate</option><option>Pacific/Enderbury</option><option>Pacific/Fakaofo</option><option>Pacific/Fiji</option><option>Pacific/Funafuti</option><option>Pacific/Galapagos</option><option>Pacific/Gambier</option><option>Pacific/Guadalcanal</option><option>Pacific/Guam</option><option>Pacific/Honolulu</option><option>Pacific/Johnston</option><option>Pacific/Kiritimati</option><option>Pacific/Kosrae</option><option>Pacific/Kwajalein</option><option>Pacific/Majuro</option><option>Pacific/Marquesas</option><option>Pacific/Midway</option><option>Pacific/Nauru</option><option>Pacific/Niue</option><option>Pacific/Norfolk</option><option>Pacific/Noumea</option><option>Pacific/Pago_Pago</option><option>Pacific/Palau</option><option>Pacific/Pitcairn</option><option>Pacific/Pohnpei</option><option>Pacific/Ponape</option><option>Pacific/Port_Moresby</option><option>Pacific/Rarotonga</option><option>Pacific/Saipan</option><option>Pacific/Samoa</option><option>Pacific/Tahiti</option><option>Pacific/Tarawa</option><option>Pacific/Tongatapu</option><option>Pacific/Truk</option><option>Pacific/Wake</option><option>Pacific/Wallis</option><option>Pacific/Yap</option><option>Poland</option><option>Portugal</option><option>PRC</option><option>PST8PDT</option><option>ROC</option><option>ROK</option><option>Singapore</option><option>Turkey</option><option>UCT</option><option>Universal</option><option>US/Alaska</option><option>US/Aleutian</option><option>US/Arizona</option><option>US/Central</option><option>US/Eastern</option><option>US/East-Indiana</option><option>US/Hawaii</option><option>US/Indiana-Starke</option><option>US/Michigan</option><option>US/Mountain</option><option>US/Pacific</option><option>US/Pacific-New</option><option>US/Samoa</option><option>UTC</option><option>WET</option><option>W-SU</option><option>Zulu</option></select>

That list 👆 is literally adding 18Kb to the download size of this blog post. That feels a bit silly to me, and not very end-user-friendly!

## v3: your timezone as a service

Being there's a service for nearly everything, I found a few offerings. I found a node module that would give me a timezone name given a latitude and longitude called [geo-tz](https://www.npmjs.com/package/geo-tz). All I needed was the lat & lng for an IP.

[ipinfo.io](https://ipinfo.io/) is my goto service for, well, IP info. It will give me a latitude and longitude for an IP, so I signed up getting a developer API key and connected up the services.

Upon my countdown getting a request, the code (roughly) looked like this:

```js
const info = await ipInfo(ip, process.env.TOKEN);
const timezone = geoTz(...info.loc.split(',').map(_ => parseFloat(_, 10)));
const tzOffset = tz.get(timezone);

// now use tzOffset in the toDays calculation…
```

The `tz.get` was a _giant_ map of timezone name to offset - generated from the Wikipedia page from the following code:

```js
(() => {
  const points = $$('.wikitable.sortable')[0].querySelectorAll(
    'td:nth-child(3), td:nth-child(6)'
  );
  const res = {};
  for (let i = 0; i < points.length; i += 2) {
    res[points[i].innerText] = points[i + 1].innerText;
  }
  return res;
})();
```

…which was turned into an ES6 `Map` object using the following code (I'm not sure why I used a `map`, I just felt like being swanky):

```js
// where `raw` is the result scraped from wikipedia
module.exports = Object.keys(raw).reduce((acc, curr) => {
  const offset = raw[curr];
  let [, dir, hour, min] = offset.match(/([+-])(\d{2}):(\d{2})/);
  hour = parseInt(hour, 10);
  min = parseInt(min, 10);
  dir = parseInt(`${dir}1`, 10);
  const ms = (HOUR * hour + MIN * min) * dir;
  return acc.set(curr, {
    offset,
    hour,
    min,
    dir,
    ms,
  });
}, new Map());
```

---

So, how did that pan out?

Well, it started to work. Then… it didn't. Not because the code was bad, but because of the sheer number of requests.

The ipinfo.io service has a free teir of 10,000 requests per month. Plenty for my little countdown I'd image.

Nope.

![ipinfo overdrive](/images/ipinfo.png)

In around 1½ days my countdown had made over 7 times the max number of requests for the month. I was quickly heading in to the **\$250 per month pricing bracket**…for a chirstmas clock!? Nope!

# v4: there's gotta be a cheaper way 😱

There is also the MaxMind (free) database that offers IP to country data that I've used for other services in the past. However, looking deeper there was a "city" database that gives me a latitude and longitude - yay.

Then by the miracle that is open source, there's an npm module that allows me to enter a lat & lng, and using a massive vector map, it will return the correct timezone - joy!

_Then_ I spotted the MaxMind database, although the pricsion isn't super accurate, it's good enough for a city level accuracy, it also includes the timezone name. I can now wire that up to my timezone name lookup to offset and I don't have to rely on spending \$3,000 per year for a silly little countdown!

Now in my server, I first open the MaxMind database so it's ready for requesting:

```js
const geoLookup = require('maxmind');

const open = async () => {
  return new Promise((resolve, reject) => {
    geoLookup.open('./data/GeoLite2-City.mmdb', (err, lookup) =>
      err ? reject(err) : resolve(lookup)
    );
  });
};

const db = open();
```

Then in my web server, I use the request's IP address to lookup the details. Since the `db` object is a promise that will repeatidly resolve with the `lookup` function, this is what my request handler looks like:

```js
db.then(lookup => {
  const ip =
    req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  send(res, 200, { ...lookup.get(ip), ip });
});
```

The result, in a single service looks like this:

```json
{
  "accuracy_radius": 1,
  "latitude": 50.8614,
  "longitude": -0.1204,
  "time_zone": "Europe/London",
  "ip": "185.65.110.157"
}
```

## Connecting the dots

Now I have my own (read: don't have to pay) service for IP to timezone, when a requet comes in, I send off to my service to get the timezone (instead of previously ipinfo.io) and use that for the timezone offset.

To calculate the countdown _correctly_ I use the following:

```js
const toDays = ms => Math.round((ms / 1000 / 60 / 60 / 24) + 1);

async function getCountdown(ip) {
  // work out the timezone based on the IP
  const res = await fetch(`https://ip2tz.isthe.link/?ip=${ip}`);
  const data = await res.json();
  // includes offset in milliseconds
  const tzOffset tz.get(data.time_zone.toLowerCase());

  let today = new Date();
  const year = today.getFullYear();
  const target = new Date(`${year}-12-25 00:00:00`);

  today = today.getTime() + tzOffset.ms; // convert to milliseconds

  return toDays(target - today);
}
```

And finally we change the `return` line to account for going past Christmas day with:

```js
let delta = toDays(target - today)

if (delta < 0) {
  delta = toDays(new Date(`${year + 1}-12-25T00:00:00`), today);
}

return delta;
```

And that's it. "Just" a little random side project that shows a countdown to a fix point in time.

## But…what about birthdays 🎂

Time and programming is hard, there's no doubt. Now imagine this same project, but for birthdays. Similar, but not the same. Most importantly, you're now working with daylight saving time 😱

It means the user could have a birthday during daylight saving time but they're looking at the clock outside of daylight saving time. It could mean their birthday is 2 days away, but actually 47 hours away - and combining DST it's the same thing…or is it? It's a headache, that's all I can tell you 😵🤯😭

## When (roaming) in Rome…

Roaming mobile networks does not (apparently) equate your phone thinking it's in that country.

Interestingly I found when testing using my mobile phone (on O2 on a UK mobile plan) testing whilst I was in Poland (sorry, "When in Poland" didn't have the same ring to it), the response was a UK IP address and UK timezone.

Apparently this is because mobile phone provides have a small set of IP addresses and when you're on roaming data, you're connecting through satalites to your network and then coming _out_ on to the web on your provider's network (rather than the network you're roaming on). Useful and interesting for debugging future IP & location based projects.

## Links and bits

- [IP to timezone service](https://ip2tz.isthe.link) (not guarenteed to remain live, but if you want it, it's there)
- [Source to timezone service](https://github.com/remy/ip2tz)
- [My countdown LaMetric app](https://apps.lametric.com/apps/days_to_christmas/2032)
- [Source to countdown service](https://github.com/remy/days-to-christmas)

Finally, the app should still provide a manual method - auto detection is great until it's not and it fails!
