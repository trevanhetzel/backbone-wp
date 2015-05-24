<script id="page" type="text/template">
	<h2><%= data.title %></h2>

	<% if (data.featured_image) { %>
		<img src="<%= data.featured_image.guid %>" class="right">
	<% } %>

	<%= data.content %>
</script>