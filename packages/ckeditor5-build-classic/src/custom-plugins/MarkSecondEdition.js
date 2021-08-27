import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export const bgColorSecondEdition = 'rgb(255, 193, 94)';

const secondEditionCfg = {
	withText: true,
	label: '1st + 2nd Edition',
	tooltip: true
};

export default class MarkSecondEdition extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'markSecondEdition', locale => {
			const view = new ButtonView( locale );
			view.set( secondEditionCfg );

			// Callback executed once the button is clicked
			view.on( 'execute', () => {
				editor.execute( 'fontBackgroundColor', { value: bgColorSecondEdition } );
			} );
			return view;
		} );
	}
}
