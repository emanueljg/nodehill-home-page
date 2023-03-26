{
  description = "The final spurt of the devop22 exercise.";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils, ... }: let
    name = "nodehill-home-page"; 
  in
    flake-utils.lib.eachDefaultSystem(system: let

      pkgs = import nixpkgs { inherit system; };

      pkg = (pkgs.buildNpmPackage {
        inherit name;
        src = ./.;
        npmDepsHash = "sha256-hGWi1vyjQ/TbtMCYF+WLN3linDr30HUflEy7QR2Q3fk=";
      }).overrideAttrs(_: { 
        postInstall = ''
          cp backend.php dist/
          cp -r dist $out/lib/node_modules/vite-project/
        '';
      });

    in {
      packages.default = pkg;
      packages.${name} = pkg;
    });
}

