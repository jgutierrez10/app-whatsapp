<template>
	<div id="app">
			<div class="container">
				<h1>🚀 Widget WhatsApp - Modo Desarrollo</h1>
				<p class="subtitle">Desarrollo con hot reload automático ⚡</p>
						
				<!-- Bootstrap 5 Widget -->
				<div class="demo-card">
					<h3>🟢 Bootstrap 5</h3>
					<p>Widget con Bootstrap 5 (más moderno)</p>
					<WhatsappApp 
						type="bootstrap-5"
						endpoint="https://httpbin.org/post"
						project="Desarrollo BS5"
						phone="+56912345678"
					/>
				</div>						
				<!-- Bootstrap 4 Widget -->
				<div class="demo-card">
					<h3>🔵 Bootstrap 4</h3>
					<p>Widget con Bootstrap 4 (compatible)</p>
					<WhatsappApp 
						type="bootstrap-4"
						endpoint="https://httpbin.org/post"
						project="Desarrollo BS4"
						phone="+56912345678"
					/>
				</div>						
				<!-- Plain CSS Widget -->
				<div class="demo-card">
					<h3>⚪ Plain CSS</h3>
					<p>Widget sin dependencias de frameworks</p>
					<WhatsappApp 
						type="plain"
						endpoint="https://httpbin.org/post"
						project="Desarrollo Plain"
						phone="+56912345678"
					/>
				</div>						
				<!-- Bootstrap 3 Widget -->
				<div class="demo-card">
					<h3>🟡 Bootstrap 3</h3>
					<p>Widget con Bootstrap 3 (legacy)</p>
					<WhatsappApp 
						type="bootstrap-3"
						endpoint="https://httpbin.org/post"
						project="Desarrollo BS3"
						phone="+56912345678"
					/>
				</div>						
				<div class="info-card">
					<h4>ℹ️ Información de desarrollo:</h4>
					<ul>
						<li>✅ <strong>Hot reload</strong>: Los cambios se ven instantáneamente</li>
						<li>✅ <strong>Source maps</strong>: Debug completo en DevTools</li>
						<li>✅ <strong>Límite</strong>: 300 caracteres en mensajes</li>
						<li>✅ <strong>Validación</strong>: Teléfono mínimo 8 dígitos</li>
						<li>🎯 <strong>Contador elegante</strong>: Sin fondo amarillo</li>
					</ul>
				</div>
			</div>
		</div>
</template>

<script>
import WhatsappApp from './components/WhatsappApp.vue';

export default {
	name: 'App',
	components: {
		WhatsappApp
	}
};
</script>

<style scoped>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	h1 {
		color: #25D366;
		text-align: center;
		margin-bottom: 10px;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin-bottom: 40px;
		font-size: 18px;
	}

	.demo-card {
		background: white;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 24px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		position: relative;
	}

	.demo-card h3 {
		margin: 0 0 8px 0;
		color: #333;
	}

	.demo-card p {
		margin: 0 0 16px 0;
		color: #666;
	}

	.info-card {
		background: #f8f9fa;
		border: 1px solid #dee2e6;
		border-radius: 12px;
		padding: 24px;
		margin-top: 32px;
	}

	.info-card h4 {
		margin: 0 0 16px 0;
		color: #495057;
	}

	.info-card ul {
		margin: 0;
		padding-left: 20px;
	}

	.info-card li {
		margin-bottom: 8px;
		color: #6c757d;
	}

	/* Responsivo */
	@media (max-width: 768px) {
		.container {
			padding: 16px;
		}
			
		.demo-card {
			padding: 20px;
		}
	}
</style>
