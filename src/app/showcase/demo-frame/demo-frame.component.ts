import { Component, Input } from '@angular/core';

export type DemoSizePreset = 'full' | 'mobile' | 'tablet' | 'desktop' | 'custom';
export type DemoAlignX = 'left' | 'center' | 'right';
export type DemoAlignY = 'top' | 'center' | 'bottom';

interface DemoSize {
  width: number;
  height: number;
}

const PRESETS: Record<Exclude<DemoSizePreset, 'full' | 'custom'>, DemoSize> = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

@Component({
  standalone: false,
  selector: 'app-demo-frame',
  templateUrl: './demo-frame.component.html',
  styleUrls: ['./demo-frame.component.scss'],
})
export class DemoFrameComponent {
  @Input() selector = '';
  @Input() role = '';
  @Input() showInputs = false;

  preset: DemoSizePreset = 'full';
  alignX: DemoAlignX = 'center';
  alignY: DemoAlignY = 'top';
  customWidth = 480;
  customHeight = 640;
  autoHeight = false;

  readonly presets: { id: DemoSizePreset; label: string }[] = [
    { id: 'full', label: 'Pleine largeur' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'tablet', label: 'Tablette' },
    { id: 'desktop', label: 'Bureau' },
    { id: 'custom', label: 'Personnalisé' },
  ];

  readonly alignXOptions: { id: DemoAlignX; label: string }[] = [
    { id: 'left', label: 'Gauche' },
    { id: 'center', label: 'Centre' },
    { id: 'right', label: 'Droite' },
  ];

  readonly alignYOptions: { id: DemoAlignY; label: string }[] = [
    { id: 'top', label: 'Haut' },
    { id: 'center', label: 'Milieu' },
    { id: 'bottom', label: 'Bas' },
  ];

  get sizeLabel(): string {
    if (this.preset === 'full') {
      return '100%';
    }
    const size = this.currentSize;
    const height = this.preset === 'custom' && this.autoHeight ? 'auto' : `${size.height}px`;
    return `${size.width}px × ${height}`;
  }

  get stageStyle(): Record<string, string> {
    return {
      justifyContent: this.alignX === 'left' ? 'flex-start' : this.alignX === 'right' ? 'flex-end' : 'center',
      alignItems: this.alignY === 'top' ? 'flex-start' : this.alignY === 'bottom' ? 'flex-end' : 'center',
    };
  }

  get viewportStyle(): Record<string, string> {
    if (this.preset === 'full') {
      return { width: '100%', height: '100%' };
    }
    const size = this.currentSize;
    return {
      width: `${size.width}px`,
      height: this.preset === 'custom' && this.autoHeight ? 'auto' : `${size.height}px`,
      maxWidth: '100%',
    };
  }

  setPreset(preset: DemoSizePreset): void {
    this.preset = preset;
  }

  onCustomWidth(value: string): void {
    const next = Number(value);
    if (Number.isFinite(next) && next >= 80) {
      this.customWidth = next;
    }
  }

  onCustomHeight(value: string): void {
    const next = Number(value);
    if (Number.isFinite(next) && next >= 80) {
      this.customHeight = next;
    }
  }

  private get currentSize(): DemoSize {
    if (this.preset === 'custom' || this.preset === 'full') {
      return { width: this.customWidth, height: this.customHeight };
    }
    return PRESETS[this.preset];
  }
}
