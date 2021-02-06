I'm writing a simple game using the [Excalibur](https://excaliburjs.com/) HTML 5
games engine. I'm going to blog about what I find out along the way. As the name
implies, this isn't a serious attempt to write a game, but rather to discover the
way the tools work so that I might be able to write a more creative game in the
future.

Hopefuly some of this is useful to other people who are getting started using
Excalibur.

{% for post in site.posts %}
* [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}
