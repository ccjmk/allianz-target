## Running the apps

1) Project was setup using `kind`, ensure it's installed and available; charts should be installable elsewhere but I didn't have other means to test them at the time.

2) Create the cluster:
```
npm run cluster:create
// should take about a min
```

3) build both docker images, then install/upgrade the chart:
```
npm run docker:build:bff
npm run docker:build:shell
npm run helm:install
```

4) FE should be available at `http://localhost:30080`

=====================================

## Some extra notes:

### Birthdate & NG-Aquila
Given that the rest of the scaffolded code was using the component library, I decided to implement the birthdate input using that too.

### Code simplifications
Zod is working both as validator and as schema definition, ok with that but maybe surfacing it as /shared/schemas is clearer than having /shared/validation and /shared/interfaces.

### About Laufzeit validation rules
Duration is set in the schema with a max of 100 years, but the validation mentions 40. If I knew where the schema definition information came from (business said "contracts are up to 40 years" or "german law mandates that XYZ can last up to 100 years" for example), I'd fix it one way or another.

### Summary Page design
The information to display is pretty straightforward, just a few isolated values. I didn't want to go overboard with any sort of design choices just because; I barely added some color to the cards to highlight them.

If i was more aware of the business rules (lets imagine the quote also generates a "risk factor" between 1-5 or something) I could represent some of that information in a more visual manner with a filling bar, a gauge, etc.. some repeating information to be represented on a table or as a modal, etc

### Error Handling
Currently showing errors returned from the BE, else a general error is displayed. If need be, some errors could be masked by the FE if need be and the generic error be shown instead.

### HELM ingress
On the HELM setup there's currently no ingress; using NodePort directly for simplicity, but it's not adequate for an actual production-ready helm chart.