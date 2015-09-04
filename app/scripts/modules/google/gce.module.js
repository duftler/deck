'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.gce', [
  require('../core/cloudProvider/cloudProvider.registry.js'),
  require('./serverGroup/details/serverGroupDetails.gce.controller.js'),
  require('./serverGroup/configure/ServerGroupCommandBuilder.js'),
  require('./serverGroup/configure/wizard/CloneServerGroupCtrl.js'),
  require('./serverGroup/configure/serverGroup.configure.gce.module.js'),
  require('./serverGroup/configure/serverGroup.transformer.service.js'),
  require('../providerSelection/provider.image.service.provider.js'),
  require('../pipelines/config/stages/bake/gce/gceBakeStage.js'),
  require('../pipelines/config/stages/resizeAsg/gce/gceResizeAsgStage.js'),
  require('./instance/gceInstanceTypeService.js'),
  require('./loadBalancer/configure/loadBalancer.transformer.service.js'),
  require('./loadBalancer/details/LoadBalancerDetailsCtrl.js'),
  require('./loadBalancer/configure/CreateLoadBalancerCtrl.js'),
  require('./instance/details/instance.details.controller.js'),
  require('./securityGroup/details/SecurityGroupDetailsCtrl.js'),
  require('./securityGroup/configure/CreateSecurityGroupCtrl.js'),
  require('./securityGroup/configure/EditSecurityGroupCtrl.js'),
])
  .config(function(providerImageServiceProvider, cloudProviderRegistryProvider) {
    providerImageServiceProvider.registerImage({
      provider: 'gce',
      key: 'logo',
      path: require('./logo_gce.png')
    });
    cloudProviderRegistryProvider.registerProvider('gce', {
      serverGroup: {
        transformer: 'gceServerGroupTransformer',
        detailsTemplateUrl: require('./serverGroup/details/serverGroupDetails.html'),
        detailsController: 'gceServerGroupDetailsCtrl',
        cloneServerGroupTemplateUrl: require('./serverGroup/configure/wizard/serverGroupWizard.html'),
        cloneServerGroupController: 'gceCloneServerGroupCtrl',
        commandBuilder: 'gceServerGroupCommandBuilder',
      },
      instance: {
        instanceTypeService: 'gceInstanceTypeService',
        detailsTemplateUrl: require('./instance/details/instanceDetails.html'),
        detailsController: 'gceInstanceDetailsCtrl',
      },
      loadBalancer: {
        transformer: 'gceLoadBalancerTransformer',
        detailsTemplateUrl: require('./loadBalancer/details/loadBalancerDetails.html'),
        detailsController: 'gceLoadBalancerDetailsCtrl',
        createLoadBalancerTemplateUrl: require('./loadBalancer/configure/createLoadBalancer.html'),
        createLoadBalancerController: 'gceCreateLoadBalancerCtrl',
      },
      securityGroup: {
        detailsTemplateUrl: require('./securityGroup/details/securityGroupDetails.html'),
        detailsController: 'gceSecurityGroupDetailsCtrl',
        createSecurityGroupTemplateUrl: require('./securityGroup/configure/createSecurityGroup.html'),
        createSecurityGroupController: 'gceCreateSecurityGroupCtrl',
      },
    });
  }).name;

