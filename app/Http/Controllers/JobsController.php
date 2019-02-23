<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class JobsController extends Controller
{
	public function index(Request $request)
    {      
     $response = $this->get_web_page_json("https://api.myjson.com/bins/kez8a");
     $jobs = json_decode($response);

     return response()->json($jobs, 201);
    }

    #Sample testing url is like
    # http://localhost:8000/jobs/title?query=dfx => Job Title
    # http://localhost:8000/jobs/companyname?query=Onco => Company name
    # http://localhost:8000/jobs/location?query=Bengaluru => location
    # http://localhost:8000/jobs/skills?query=css => Skills
    # http://localhost:8000/jobs/source?query=techgig => source
    # http://localhost:8000/jobs/salary?query=10000 => salary
    # http://localhost:8000/jobs/type?query=intern => type
    # http://localhost:8000/jobs/experience?query=8 => experience
    # http://localhost:8000/jobs/startdate?query=2018-07-14 => startdate

    public function search($serch_by, Request $request)
    {  

      $sort   = $request->get('sort');
      $sort_by = $request->get('sort_by');
      $query = $request->get('query');
      $response = $this->get_search_data($serch_by,$query,$sort,$sort_by);
      // $jobs = json_decode($response);
      return response()->json($response, 201);
    }

    private function get_web_page_json($url) {
      $options = array(
          CURLOPT_RETURNTRANSFER => true,   // return web page
          CURLOPT_HEADER         => false,  // don't return headers
          CURLOPT_FOLLOWLOCATION => true,   // follow redirects
          CURLOPT_MAXREDIRS      => 10,     // stop after 10 redirects
          CURLOPT_ENCODING       => "",     // handle compressed
          CURLOPT_USERAGENT      => "test", // name of client
          CURLOPT_AUTOREFERER    => true,   // set referrer on redirect
          CURLOPT_CONNECTTIMEOUT => 120,    // time-out on connect
          CURLOPT_TIMEOUT        => 120,    // time-out on response
      ); 

      $ch = curl_init($url);
      curl_setopt_array($ch, $options);

      $content  = curl_exec($ch);

      curl_close($ch);

      return $content;
    }

    private function get_search_data($serch_by,$query,$sort,$sort_by) {
        $fullJsonData =  $this->get_web_page_json("https://api.myjson.com/bins/kez8a");
        $toSearchData = json_decode($fullJsonData);

        $jsonReturnArray = array();

        if ($query){
          foreach($toSearchData->jobsfeed as $item)
          {
            if (strpos(strtolower($item->$serch_by),strtolower($query)) !== false)
            {
              array_push($jsonReturnArray, $item);
            }
          }
        }

        if ($sort_by)
        {
          if($sort_by == 'location')
          {
           $jsonReturnArray = $this->sort_data_by_location($jsonReturnArray,$sort_by,$sort);
          }else{
           $jsonReturnArray = $this->sort_data_by_type($jsonReturnArray,$sort_by,$sort);
          }
        }

        return $jsonReturnArray;
    }
    
     # This logic is redundent, needs to be improved
     private function sort_data_by_location($jsonReturnArray,$sort_by,$sort) {
        if($sort == 'asc'){
          usort($jsonReturnArray, function($a, $b) {
            return $a->location > $b->location ? -1 : 1;
          });
        }else{
          usort($jsonReturnArray, function($a, $b) {
            return $a->location > $b->location ? 1 : -1;
          });
        }
        return $jsonReturnArray;
    }

    private function sort_data_by_type($jsonReturnArray,$sort_by,$sort) {
        if($sort == 'asc'){
          usort($jsonReturnArray, function($a, $b) {
            return $a->type > $b->type ? -1 : 1;
          });
        }else{
          usort($jsonReturnArray, function($a, $b) {
            return $a->type > $b->type ? 1 : -1;
          });
        }

        return $jsonReturnArray;
    }
}
