import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Button, Modal, SearchControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { applyFormat, create, insert } from '@wordpress/rich-text';

import googleMetadata from '../inc/material-icons.json';

const EditMaterialIcon = ( { isActive, onChange, value } ) => {
	const [ iconList, setIconList ] = useState( googleMetadata.icons );
	const [ filterTerm, setFilterTerm ] = useState( '' );
	const [ showPopover, setShowPopover ] = useState( false );

	let iconGallery;
	let filteredList;

	if ( filterTerm !== '' ) {
		filteredList = iconList.filter( ( icon ) => {
			return (
				icon.name.includes( filterTerm ) ||
				icon.tags.includes( filterTerm )
			);
		} );
	}

	const iconSelectorHandler = ( selectedValue ) => {
		setShowPopover( false );

		const toInsert = applyFormat(
			create( { text: selectedValue } ),
			{
				type: 'mizzou/material-icon',
			},
			0,
			selectedValue.length
		);

		onChange( insert( value, toInsert ) );
	};

	if ( iconList && ! filteredList ) {
		iconGallery = iconList.map( ( icon, i ) => (
			<Button
				size="compact"
				key={ i }
				label={ icon.name }
				onClick={ () => iconSelectorHandler( icon.name ) }
			>
				<i className="miz-icon miz-icon--xl material-icons">
					{ icon.name }
				</i>
			</Button>
		) );
	} else if ( filteredList ) {
		iconGallery = filteredList.map( ( icon, i ) => (
			<Button
				size="compact"
				key={ i }
				label={ icon.name }
				onClick={ () => iconSelectorHandler( icon.name ) }
			>
				<i className="miz-icon miz-icon--xl material-icons">
					{ icon.name }
				</i>
			</Button>
		) );
	}

	const onClickEvent = () => {
		setShowPopover( true );
	};

	return (
		<>
			<RichTextToolbarButton
				icon="carrot"
				title="Material Icon"
				onClick={ onClickEvent }
				isActive={ isActive }
			/>
			{ showPopover && (
				<Modal
					title={ 'Material Icons' }
					onRequestClose={ () => setShowPopover( false ) }
				>
					<>
						<p>Select an icon to insert.</p>
						<SearchControl
							value={ filterTerm }
							onChange={ ( newFilter ) =>
								setFilterTerm( newFilter )
							}
						/>
						{ iconGallery }
					</>
				</Modal>
			) }
		</>
	);
};

export default EditMaterialIcon;

EditMaterialIcon.propTypes = {};
