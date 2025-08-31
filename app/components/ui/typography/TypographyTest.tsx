import { SpaceHeading, SpaceSubheading, SpaceBody, SpaceCaption } from './index';

export function TypographyTest() {
  return (
    <div className="p-8 space-y-6 bg-black/50 backdrop-blur-sm rounded-lg">
      <SpaceHeading level={1} gradient>
        Space Typography System
      </SpaceHeading>
      
      <SpaceSubheading level={2}>
        Orbitron Primary Font
      </SpaceSubheading>
      
      <SpaceSubheading level={3} accent>
        Audiowide Accent Font
      </SpaceSubheading>
      
      <SpaceBody>
        This is body text using Exo 2 font. It should be clean, modern, and highly readable 
        across all devices while maintaining the space theme aesthetic.
      </SpaceBody>
      
      <SpaceBody size="sm" variant="secondary">
        This is smaller secondary body text with reduced opacity.
      </SpaceBody>
      
      <SpaceCaption>
        This is caption text for small details
      </SpaceCaption>
      
      <SpaceCaption variant="accent">
        ACCENT CAPTION TEXT
      </SpaceCaption>
      
      <SpaceCaption variant="mono">
        console.log('Fira Code mono font');
      </SpaceCaption>
    </div>
  );
}