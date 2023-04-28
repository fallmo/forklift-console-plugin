import { Property } from './model';
import { Resource } from './Resource';

// https://github.com/kubev2v/forklift/tree/main/pkg/controller/provider/web/ovirt/nicprofile.go
export interface NicProfile extends Resource {
  // Network       string           `json:"network"`
  network: string;
  // NetworkFilter string           `json:"networkFilter"`
  networkFilter: string;
  // PortMirroring bool             `json:"portMirroring"`
  portMirroring: boolean;
  // QoS           string           `json:"qos"`
  qos: string;
  // Properties    []model.Property `json:"properties"`
  properties: Property[];
  // PassThrough   bool             `json:"passThrough"`
  passThrough: boolean;
}
