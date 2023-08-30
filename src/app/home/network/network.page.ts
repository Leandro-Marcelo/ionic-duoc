import { Component, OnDestroy, OnInit } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit, OnDestroy {

  networkListener: PluginListenerHandle | null = null;
  status: ConnectionStatus | null = null;

  constructor() { }
 

  async ngOnInit() {
    this.networkListener = Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.status = status;
      Toast.show({
        text: `Network status changed: ${status.connected ? 'Connected' : 'Disconnected'}`,
      }).then(() => {}).catch((err) => {
        console.log(err)
      })
    });

    this.status = await Network.getStatus();
    console.log('Network status:', this.status);
  }

  

  ngOnDestroy() {
    throw new Error('Method not implemented.');
  }

  

}
