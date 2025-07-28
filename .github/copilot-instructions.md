<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WhatsApp Contact Widget Project

This is a Vue 3 + Vite project for a WhatsApp contact widget that supports multiple modal implementations.

## Code Style Guidelines
- Use single quotes for all strings
- Use ES Modules (import/export)
- Use tabs (4 spaces) for indentation
- Do not use em dashes (—)
- Do not use inline or `<style>` blocks in components
- All styling must go into `src/assets/style.scss`

## Project Structure
- `src/api/` - Axios instance and API services
- `src/helpers/` - Utility functions like validation
- `src/composables/` - Vue 3 composables for shared logic
- `src/components/` - Vue components including modal implementations
- `src/assets/style.scss` - Global styles for all components

## Architecture Notes
- Uses a centralized Axios instance named `api`
- Form state and validation managed through composables
- Supports Bootstrap 3, 4, 5, and plain CSS modal implementations
- Auto-mounts on containers with `id="whatsapp-app-container"`
- Reads configuration from data attributes on container elements

## Widget Integration
Containers must include these data attributes:
- `data-type` → 'bootstrap-3', 'bootstrap-4', 'bootstrap-5', or 'plain'
- `data-endpoint` → API endpoint URL
- `data-project` → Project name to include in payload
- `data-phone` → WhatsApp phone number for display
