/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';

import List from '@ckeditor/ckeditor5-list/src/list';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

import Link from '@ckeditor/ckeditor5-link/src/link';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import FetchUploadAdapter from './custom-plugins/FetchUploadAdapter';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';

import MarkFirstEditions, { bgColorFirstEdition } from './custom-plugins/MarkFirstEdition';
import MarkSecondEdition, { bgColorSecondEdition } from './custom-plugins/MarkSecondEdition';
import MarkAllEditions from './custom-plugins/MarkAllEditions';
import FullScreen from './custom-plugins/FullScreen';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Paragraph,
	TextTransformation,
	PasteFromOffice,

	MarkFirstEditions,
	MarkSecondEdition,
	MarkAllEditions,
	FullScreen,

	Heading,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Superscript,
	Subscript,
	RemoveFormat,

	FontColor,
	FontBackgroundColor,

	List,
	Alignment,

	Link,
	HorizontalLine,

	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	LinkImage,
	ImageResize,
	ImageUpload,
	FetchUploadAdapter,

	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	TableCaption
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'undo', 'redo',
			'|',
			'markFirstEdition', 'markSecondEdition', 'markAllEditions',
			'|',
			'fullScreen',
			'-',
			'heading',
			'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeFormat',
			'|',
			'fontColor', 'fontBackgroundColor',
			'|',
			'bulletedList', 'numberedList', 'alignment',
			'|',
			'link', 'horizontalLine',
			'uploadImage',
			'insertTable'
		],
		shouldNotGroupWhenFull: true
	},
	heading: {
		options: [
			{ model: 'paragraph', view: { name: 'p', classes: '' },
				title: 'Body', class: 'ck-heading_body' },
			{ model: 'paragraphSubheading', view: { name: 'p', classes: 'subheading' },
				title: 'Subheading', class: 'ck-heading_subheading', converterPriority: 'high' },
			{ model: 'paragraphSource', view: { name: 'p', classes: 'source' },
				title: 'Source', class: 'ck-heading_source', converterPriority: 'high' },
			{ model: 'paragraphFootnote', view: { name: 'p', classes: 'footnote' },
				title: 'Footnote', class: 'ck-heading_footnote', converterPriority: 'high' }
		]
	},
	fontColor: {
		colors: [
			{
				color: '#000',
				label: 'Black'
			},
			{
				color: '#5a6872',
				label: 'Secondary text'
			},
			{
				color: '#007dbc',
				label: 'WFP brand'
			},
			{
				color: '#c5192d',
				label: 'Red'
			},
			{
				color: '#689e18',
				label: 'Green'
			},
			{
				color: '#f7b825',
				label: 'Orange'
			},
			{
				color: '#3C5979',
				label: 'National'
			},
			{
				color: '#fcc30b',
				label: 'International'
			}
		],
		columns: 3,
		documentColors: 0
	},
	fontBackgroundColor: {
		colors: [
			{
				color: bgColorFirstEdition,
				label: '1st Edition only'
			},
			{
				color: bgColorSecondEdition,
				label: '1st + 2nd Edition'
			},
			{
				color: '#fdfd77',
				label: 'Highlight yellow'
			},
			{
				color: '#62f962',
				label: 'Highlight green'
			}
		],
		documentColors: 0
	},
	image: {
		toolbar: [
			'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
			'|',
			'resizeImage',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		],
		resizeOptions: [
			{ name: 'resizeImage:original', value: null, label: 'Original' },
			{ name: 'resizeImage:25', value: '25', label: '25%' },
			{ name: 'resizeImage:50', value: '50', label: '50%' },
			{ name: 'resizeImage:75', value: '75', label: '75%' },
			{ name: 'resizeImage:100', value: '100', label: '100%' }
		]
	},
	table: {
		contentToolbar: [
			'tableColumn', 'tableRow', 'mergeTableCells',
			'tableProperties', 'tableCellProperties', 'toggleTableCaption'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
