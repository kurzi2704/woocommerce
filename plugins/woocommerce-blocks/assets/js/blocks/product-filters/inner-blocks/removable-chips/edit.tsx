/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
import { Icon, closeSmall } from '@wordpress/icons';
import { Label } from '@woocommerce/blocks-components';
import {
	InspectorControls,
	useBlockProps,
	withColors,
	// @ts-expect-error - no types.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// @ts-expect-error - no types.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { EditProps } from './types';
import { getColorClasses, getColorVars } from './utils';

const Edit = ( props: EditProps ): JSX.Element => {
	const colorGradientSettings = useMultipleOriginColorsAndGradients();
	const {
		context,
		clientId,
		attributes,
		setAttributes,
		chipText,
		setChipText,
		chipBackground,
		setChipBackground,
		chipBorder,
		setChipBorder,
	} = props;
	const { customChipText, customChipBackground, customChipBorder } =
		attributes;
	const { filterData } = context;
	const { items } = filterData;

	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-product-filter-removable-chips', {
			...getColorClasses( attributes ),
		} ),
		style: getColorVars( attributes ),
	} );

	const removeText = ( label: string ): string => {
		return sprintf(
			/* translators: %s attribute value used in the filter. For example: yellow, green, small, large. */
			__( 'Remove %s filter', 'woocommerce' ),
			label
		);
	};

	return (
		<>
			<div { ...blockProps }>
				<ul className="wc-block-product-filter-removable-chips__items">
					{ items?.map( ( item, index ) => (
						<li
							key={ index }
							className="wc-block-product-filter-removable-chips__item"
						>
							<span className="wc-block-product-filter-removable-chips__label">
								{ item.type + ': ' + item.label }
							</span>
							<button className="wc-block-product-filter-removable-chips__remove">
								<Icon
									className="wc-block-product-filter-removable-chips__remove-icon"
									icon={ closeSmall }
									size={ 25 }
								/>
								<Label
									screenReaderLabel={ removeText(
										item.type + ': ' + item.label
									) }
								/>
							</button>
						</li>
					) ) }
				</ul>
			</div>
			<InspectorControls group="color">
				{ colorGradientSettings.hasColorsOrGradients && (
					<ColorGradientSettingsDropdown
						__experimentalIsRenderedInSidebar
						settings={ [
							{
								label: __( 'Chip Text', 'woocommerce' ),
								colorValue: chipText.color || customChipText,
								onColorChange: ( colorValue: string ) => {
									setChipText( colorValue );
									setAttributes( {
										customChipText: colorValue,
									} );
								},
								resetAllFilter: () => {
									setChipText( '' );
									setAttributes( {
										customChipText: '',
									} );
								},
							},
							{
								label: __( 'Chip Border', 'woocommerce' ),
								colorValue:
									chipBorder.color || customChipBorder,
								onColorChange: ( colorValue: string ) => {
									setChipBorder( colorValue );
									setAttributes( {
										customChipBorder: colorValue,
									} );
								},
								resetAllFilter: () => {
									setChipBorder( '' );
									setAttributes( {
										customChipBorder: '',
									} );
								},
							},
							{
								label: __( 'Chip Background', 'woocommerce' ),
								colorValue:
									chipBackground.color ||
									customChipBackground,
								onColorChange: ( colorValue: string ) => {
									setChipBackground( colorValue );
									setAttributes( {
										customChipBackground: colorValue,
									} );
								},
								resetAllFilter: () => {
									setChipBackground( '' );
									setAttributes( {
										customChipBackground: '',
									} );
								},
							},
						] }
						panelId={ clientId }
						{ ...colorGradientSettings }
					/>
				) }
			</InspectorControls>
		</>
	);
};

export default withColors( {
	chipText: 'chip-text',
	chipBorder: 'chip-border',
	chipBackground: 'chip-background',
} )( Edit );
