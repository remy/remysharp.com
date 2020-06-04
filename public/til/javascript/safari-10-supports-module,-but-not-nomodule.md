# Safari 10 supports module, but not nomodule

More and more of my own project uses `<script type="module" src="app.js">`, and for good measure, I tend to use [Parcel](https://parceljs.org/) (or [Rollup](https://rollupjs.org/guide/en/)) to compile a nomodule bundle that ships alongside the "regular" code.

Except, of course, Safari 10 doesn't support `nomodule`. News to me, TIL.

So in this case the whole codebase gets run _twice_.

Thankfully a smartie has [a solution](https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc) to detect `nomodule` support.
