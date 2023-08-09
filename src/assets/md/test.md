<!--- app-name: Grafana -->
​
# Grafana packaged by Bitnami
​
Grafana is an open source metric analytics and visualization suite for visualizing time series data that supports various types of data sources.
​
[Overview of Grafana](https://grafana.com/)
​
Trademarks: This software listing is packaged by Bitnami. The respective trademarks mentioned in the offering are owned by the respective companies, and use of them does not imply any affiliation or endorsement.
​
## TL;DR
​
```console
helm install my-release oci://registry-1.docker.io/bitnamicharts/grafana
```
​
## Introduction
​
This chart bootstraps a [grafana](https://github.com/bitnami/containers/tree/main/bitnami/grafana) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.
​
Bitnami charts can be used with [Kubeapps](https://kubeapps.dev/) for deployment and management of Helm Charts in clusters.
​
Looking to use Grafana in production? Try [VMware Application Catalog](https://bitnami.com/enterprise), the enterprise edition of Bitnami Application Catalog.
​
## Prerequisites
​
- Kubernetes 1.19+
- Helm 3.2.0+
- PV provisioner support in the underlying infrastructure
- ReadWriteMany volumes for deployment scaling
​
## Installing the Chart
​
To install the chart with the release name `my-release`:
​
```console
helm install my-release oci://registry-1.docker.io/bitnamicharts/grafana
```
​
These commands deploy grafana on the Kubernetes cluster in the default configuration. The [Parameters](#parameters) section lists the parameters that can be configured during installation.
​
> **Tip**: List all releases using `helm list`
​
## Uninstalling the Chart
​
To uninstall/delete the `my-release` deployment:
​
```console
helm delete my-release
```
​
The command removes all the Kubernetes components associated with the chart and deletes the release. Use the option `--purge` to delete all persistent volumes too.
​
## Differences between the Bitnami Grafana chart and the Bitnami Grafana Operator chart
​
In the Bitnami catalog we offer both the bitnami/grafana and bitnami/grafana-operator charts. Each solution covers different needs and use cases.
​
The *bitnami/grafana* chart deploys a single Grafana installation (with grafana-image-renderer) using a Kubernetes Deployment object (together with Services, PVCs, ConfigMaps, etc.). The figure below shows the deployed objects in the cluster after executing *helm install*:
​
```text
                    +--------------+             +-----+
                    |              |             |     |
 Service & Ingress  |    Grafana   +<------------+ PVC |
<-------------------+              |             |     |
                    |  Deployment  |             +-----+
                    |              |
                    +-----------+--+
                                ^                +------------+
                                |                |            |
                                +----------------+ Configmaps |
                                                 |   Secrets  |
                                                 |            |
                                                 +------------+
​
```
​
Its lifecycle is managed using Helm and, at the Grafana container level, the following operations are automated: persistence management, configuration based on environment variables and plugin initialization. The chart also allows deploying dashboards and data sources using ConfigMaps. The Deployments do not require any ServiceAccounts with special RBAC privileges so this solution would fit better in more restricted Kubernetes installations.
​
The *bitnami/grafana-operator* chart deploys a Grafana Operator installation using a Kubernetes Deployment.  The figure below shows the Grafana operator deployment after executing *helm install*:
​
```text
+--------------------+
|                    |      +---------------+
|  Grafana Operator  |      |               |
|                    |      |     RBAC      |
|    Deployment      |      |   Privileges  |
|                    |      |               |
+-------+------------+      +-------+-------+
        ^                           |
        |   +-----------------+     |
        +---+ Service Account +<----+
            +-----------------+
```
​
The operator will extend the Kubernetes API with the following objects: *Grafana*, *GrafanaDashboards* and *GrafanaDataSources*. From that moment, the user will be able to deploy objects of these kinds and the previously deployed Operator will take care of deploying all the required Deployments, ConfigMaps and Services for running a Grafana instance. Its lifecycle is managed using *kubectl* on the Grafana, GrafanaDashboards and GrafanaDataSource objects. The following figure shows the deployed objects after
 deploying a *Grafana* object using *kubectl*:
​
```text
+--------------------+
|                    |      +---------------+
|  Grafana Operator  |      |               |
|                    |      |     RBAC      |
|    Deployment      |      |   Privileges  |
|                    |      |               |
+--+----+------------+      +-------+-------+
   |    ^                           |
   |    |   +-----------------+     |
   |    +---+ Service Account +<----+
   |        +-----------------+
   |
   |
   |
   |
   |                                                   Grafana
   |                     +---------------------------------------------------------------------------+
   |                     |                                                                           |
   |                     |                          +--------------+             +-----+             |
   |                     |                          |              |             |     |             |
   +-------------------->+       Service & Ingress  |    Grafana   +<------------+ PVC |             |
                         |      <-------------------+              |             |     |             |
                         |                          |  Deployment  |             +-----+             |
                         |                          |              |                                 |
                         |                          +-----------+--+                                 |
                         |                                      ^                +------------+      |
                         |                                      |                |            |      |
                         |                                      +----------------+ Configmaps |      |
                         |                                                       |   Secrets  |      |
                         |                                                       |            |      |
                         |                                                       +------------+      |
                         |                                                                           |
                         +---------------------------------------------------------------------------+
​
```
​
This solution allows to easily deploy multiple Grafana instances compared to the *bitnami/grafana* chart. As the operator automatically deploys Grafana installations, the Grafana Operator pods will require a ServiceAccount with privileges to create and destroy mulitple Kubernetes objects. This may be problematic for Kubernetes clusters with strict role-based access policies.
​
## Parameters
​
### Global parameters
​
| Name                      | Description                                     | Value |
| ------------------------- | ----------------------------------------------- | ----- |
| `global.imageRegistry`    | Global Docker image registry                    | `""`  |
| `global.imagePullSecrets` | Global Docker registry secret names as an array | `[]`  |
| `global.storageClass`     | Global StorageClass for Persistent Volume(s)    | `""`  |
​
### Common parameters
​
| Name                | Description                                                                             | Value           |
| ------------------- | --------------------------------------------------------------------------------------- | --------------- |
| `kubeVersion`       | Force target Kubernetes version (using Helm capabilities if not set)                    | `""`            |
| `extraDeploy`       | Array of extra objects to deploy with the release                                       | `[]`            |
| `nameOverride`      | String to partially override grafana.fullname template (will maintain the release name) | `""`            |
| `fullnameOverride`  | String to fully override grafana.fullname template                                      | `""`            |
| `clusterDomain`     | Default Kubernetes cluster domain                                                       | `cluster.local` |
| `commonLabels`      | Labels to add to all deployed objects                                                   | `{}`            |
| `commonAnnotations` | Annotations to add to all deployed objects                                              | `{}`            |
​
### Grafana parameters
​
| Name                               | Description                                                                                                                                          | Value                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `image.registry`                   | Grafana image registry                                                                                                                               | `docker.io`                       |
| `image.repository`                 | Grafana image repository                                                                                                                             | `bitnami/grafana`                 |
| `image.tag`                        | Grafana image tag (immutable tags are recommended)                                                                                                   | `10.0.3-debian-11-r0`             |
| `image.digest`                     | Grafana image digest in the way sha256:aa.... Please note this parameter, if set, will override the tag                                              | `""`                              |
| `image.pullPolicy`                 | Grafana image pull policy                                                                                                                            | `IfNotPresent`                    |
| `image.pullSecrets`                | Grafana image pull secrets                                                                                                                           | `[]`                              |
| `admin.user`                       | Grafana admin username                                                                                                                               | `admin`                           |
| `admin.password`                   | Admin password. If a password is not provided a random password will be generated                                                                    | `""`                              |
| `admin.existingSecret`             | Name of the existing secret containing admin password                                                                                                | `""`                              |
| `admin.existingSecretPasswordKey`  | Password key on the existing secret                                                                                                                  | `password`                        |
| `smtp.enabled`                     | Enable SMTP configuration                                                                                                                            | `false`                           |
| `smtp.user`                        | SMTP user                                                                                                                                            | `user`                        ...