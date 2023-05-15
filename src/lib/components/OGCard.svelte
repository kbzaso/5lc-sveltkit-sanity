<script>
    export let message = '';
  </script>

<div id="container"> 
		<img id="staff" src={message} alt="SEO Image" width="600"  />
</div>

<style>
	#container {
		font-family: 'Noto Sans';
		background-image: url('https://res.cloudinary.com/dtj5xnlou/image/upload/v1684169465/5LC/seo_image.jpg');
		background-position: center;
		background-size: cover;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		items-align: end;
		justify-content: center;
	}
</style>