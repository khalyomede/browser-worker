import { CacheStrategy } from "./main";

if (!("CacheStrategy" in window)) {
	window.CacheStrategy = CacheStrategy;
}
