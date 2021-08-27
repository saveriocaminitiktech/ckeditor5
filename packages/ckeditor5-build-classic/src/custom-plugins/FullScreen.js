import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import ImageFullScreen from '../icons/fullscreen.svg';

import './FullScreen.css';

const goFullScreenCfg = {
	label: 'Full screen',
	icon: ImageFullScreen,
	isToggleable: true,
	isOn: false,
	tooltip: true
};

const backToNormalCfg = {
	label: 'Exit full screen',
	icon: ImageFullScreen,
	isToggleable: true,
	isOn: true,
	tooltip: true
};

export default class FullScreen extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'fullScreen', locale => {
			const view = new ButtonView( locale );
			let isFullScreen = false;
			view.set( goFullScreenCfg );

			// Callback executed once the button is clicked
			view.on( 'execute', () => {
				if ( isFullScreen ) {
					editor.sourceElement.nextElementSibling.classList.remove( 'ck-fullscreen' );
					// eslint-disable-next-line no-undef
					document.body.classList.remove( 'ck-fullscreen-overlay' );
					view.set( goFullScreenCfg );
					isFullScreen = false;
				} else {
					editor.sourceElement.nextElementSibling.classList.add( 'ck-fullscreen' );
					// eslint-disable-next-line no-undef
					document.body.classList.add( 'ck-fullscreen-overlay' );
					view.set( backToNormalCfg );
					isFullScreen = true;
				}
			} );
			return view;
		} );
	}
}
