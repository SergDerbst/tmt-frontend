import { FormElementBase } from "./form/elements/form.element.base";
import { FormElementLink } from "./form/elements/form.element.link";
import { FormElementButton } from "./form/elements/form.element.button";
import { FormConfig } from "./form/form.config";

export function createFormConfig(config: {
			elements?: FormElementBase<any>[],
			links?: FormElementLink[],
			buttons?: FormElementButton[]
		}):FormConfig {
	let baseConfig = new FormConfig({
		id: 'id',
		text: 'text',
		markRequired: true,
		groups: [
			{
				caption: 'caption.visible',
				captionVisible: true,
				elements: [
					new FormElementBase<any>({
						key: 'first',
						type: 'type',
						required: true,
						order: 666
					})
				]
			}, {
				caption: 'caption.invisible',
				captionVisible: false,
				elements: [
					new FormElementBase<any>({
						key: 'second',
						type: 'type',
						required: false,
						order: 23
					})
				]
			}
		],
		buttons: [
			new FormElementButton({
				key: 'validated.submit.button',
				validate: true,
				order: 666,
				type: 'submit',
				orientation: 'left'
			}),
			new FormElementButton({
				key: 'invalidated.whatever.button',
				validate: false,
				order: 23,
				type: 'button',
				orientation: 'right'
			})
		],
		links: [
			new FormElementLink({
				key: 'link',
				href: '/elsewhere',
				order: 666,
				orientation: 'left'
			})
		]
	});
	//Override the base, bitch!
	baseConfig.groups[0].elements = config.elements ? config.elements : baseConfig.groups[0].elements;
	baseConfig.groups[1].elements = config.elements ? config.elements : baseConfig.groups[1].elements;
	baseConfig.buttons = config.buttons ? config.buttons : baseConfig.buttons;
	baseConfig.links = config.links ? config.links : baseConfig.links;
	return baseConfig;
}