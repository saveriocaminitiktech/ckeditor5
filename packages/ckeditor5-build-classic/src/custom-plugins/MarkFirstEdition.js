import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export const bgColorFirstEdition = 'rgb(255, 109, 94)';

const firstEditionCfg = {
	withText: true,
	label: '1st Edition only',
	tooltip: true
};

export default class MarkFirstEdition extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'markFirstEdition', locale => {
			const view = new ButtonView( locale );
			view.set( firstEditionCfg );

			// Callback executed once the button is clicked
			view.on( 'execute', () => {
				editor.execute( 'fontBackgroundColor', { value: bgColorFirstEdition } );
			} );
			return view;
		} );
	}
}
