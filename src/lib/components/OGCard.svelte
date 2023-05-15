<script>
    export let message = '';
  </script>

<div id="container"> 
	<img id="staff" src={message} alt="SEO Image" height="600"  />
</div>

<style>
	#container {
		font-family: 'Noto Sans';
		background-image: url('https://res.cloudinary.com/dtj5xnlou/image/upload/v1684169465/5LC/seo_image.jpg');
		background-color: #facc15;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		items-align: end;
		justify-content: center;
	}

	#staff {
		height:100%;
	}
</style>