In this directory I'm going to talk about things I discovered as I
created this game.

{% for post in site.posts %}
* [{{ post.title }}]({{ site.baseurl }}{{ post.url }})
{% endfor %}
