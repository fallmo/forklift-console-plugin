<img src="docs/icons/forklift-logo-lightbg.svg" alt="Logo" width="100" />

# OpenShift Console Plugin For Forklift

[![CI Workflow](https://github.com/kubev2v/forklift-console-plugin/actions/workflows/on-push.yaml/badge.svg)](https://quay.io/repository/kubev2v/forklift-console-plugin)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kubev2v_forklift-console-plugin&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kubev2v_forklift-console-plugin)

forklift-console-plugin is an open source project providing [Openshift web console](https://github.com/openshift/console) plugin for [Migration Toolkit for Virtualization](https://github.com/kubev2v/forklift). The plugin adds a web based user interface for Migration Toolkit for Virtualization inside Openshift web console.

Migration Toolkit for Virtualization (Forklift) is a suite of migration tools that facilitate the import of virtualization workloads from [oVirt](https://www.ovirt.org/), VMware and [OpenStack](https://www.openstack.org/) to [OpenShift Virtualization](https://github.com/kubevirt).

Forklift console plugin is managed by Migration Toolkit for Virtualization operator, when installing the operator on Openshift cluster, the plugin will be installed automatically, and the Migration menu item will be added to the Openshift web console.

### Prerequisites

* [__Forklift Operator__](https://github.com/kubev2v/forklift/)
* [__OpenShift Console__](https://github.com/openshift/console/)

## Installation

To get started, clone the repo to your development workstation and install the required dependencies locally with NPM.

``` bash
git clone https://github.com/kubev2v/forklift-console-plugin.git
cd forklift-console-plugin
npm install
```

## Quick start

With a user logged in to existing Kubernetes or Openshift environment with Forklift operator available, one can start a locally served forklift-console-plugin instance ( running on http://localhost:9000 ) with:

``` bash
# Start a local Openshift console server on the background.
# - The console will be available in http://localhost:9000
# - The inventory URL can be set using an enviorment variable,
#   ( default value for INVENTORY_SERVER_HOST is https://localhost:30444 )
#   for example:
#     export INVENTORY_SERVER_HOST=https://virt-konveyor-forklift.apps.example.com
# - To close the console server run:
#   npm run console:stop

# Setting the console image and forklift setvice URLs as enviorment variables:
#
# Note: default values works with the local development cluster, you can create using the CI.
#       set this variables if you use a different cluster.
export INVENTORY_SERVER_HOST=https://virt-konveyor-forklift.apps.<your caluster address>
export SERVICES_API_SERVER_HOST=https://virt-konveyor-forklift.apps.<your caluster address>
export CONSOLE_IMAGE=quay.io/openshift/origin-console:4.15

# Run the web console locally (uses the enviorment variables we defined above)
npm run console

# If this is the first time running, npm run build will build the required dependencies
npm run build

# Start the plugin in development mode
npm run start
```

## Setup a local cluster for development

Forklift console plugin requires the user to be logged into an openshift or kubernetes cluster, if you do not have access to one, you can setup your own using [Openshift local]( https://developers.redhat.com/products/openshift-local/overview) or use the CI script to build a local [KinD](https://sigs.k8s.io/kind) cluster.

``` bash
# Setup a kind cluster with Forklift operator and an OKD web console
npm run cluster:up

# Example: setup a local KinD cluster with ovirt mock provider
#          [ options: --with-all-providers --with-ovirt-provider, --with-vmware-provider, --with-openstack-provider]
#
# Note I:  mock providers requires forkliftci, clone on the ci directory
# Note II: mock providers requires NFS server running, look at forkliftci documentation for more details.
#          See: forkliftci/cluster/providers/utils/install_nfs.sh
git clone git@github.com:kubev2v/forkliftci.git ./ci/forkliftci
npm run cluster:up -- --with-ovirt-provider

# run cleanup to stop and delete the cluster.
npm run cluster:delete
```

## Learn more

More documentation is available in the [docs](./docs) directory.

| Reference |  |
|---|----|
| [Forklift](https://github.com/kubev2v/forklift/) | Migration toolkit for virtualization |
| [Openshift web console](https://github.com/openshift/console) | Openshift web console is a web based user interface for Openshift. |
| [OpenShift Dynamic Plugin SDK](https://github.com/openshift/dynamic-plugin-sdk) | Dynamic plugin SDK for Openshift user interfaces. |
| [Forklift documentation](https://github.com/kubev2v/forklift-documentation) | Usage documentation for the migration toolkit for viertualization. |
| [Forklict CI](https://github.com/kubev2v/forkliftci) | Collection of scripts and tools used in forklict development. |
| [Patternfly](https://www.patternfly.org/) | Open source design system used for Openshift user interfaces development. |
