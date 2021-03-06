import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import model from 'dummy/models/global-navigation';

module('Integration | Component | global-navigation', function (hooks) {
	setupRenderingTest(hooks);

	test('it renders', async function (assert) {
		this.owner.register(
			'service:i18n',
			Service.extend({
				t(key) {
					return key;
				},
			}),
		);

		this.set('model', model['logged-out-default']);
		await render(hbs`
			<GlobalNavigation @model={{model}}/>
		`);

		assert.dom('.wds-global-navigation').exists();
		assert.dom('.wds-global-navigation__logo').exists();
		assert.dom('.wds-global-navigation__link').exists({ count: 5 });
		assert
			.dom('.wds-global-navigation__search')
			.hasText(
				'design-system:global-navigation-search-placeholder-inactive',
			);
	});
});
